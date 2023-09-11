import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"
import * as Long from "long"

import { WalletContext } from "chora"
import { MsgExec } from "chora/api/cosmos/group/v1/tx"
import { choraLocal, choraTestnet } from "chora/chains"
import { ResultTx } from "chora/components"
import { formatTimestamp, signAndBroadcast } from "chora/utils"
import { proposalStatusToJSON, proposalExecutorResultToJSON } from "chora/api/cosmos/group/v1/types"

import * as styles from "./Proposal.module.css"

const groupId = "1"
const queryMembers = "cosmos/group/v1/group_members" // TODO(cosmos-sdk): group member query
const queryPolicy = "/cosmos/group/v1/group_policy_info"
const queryProposal = "cosmos/group/v1/proposal"
const queryVotes = "cosmos/group/v1/votes_by_proposal"

// TODO(cosmos-sdk): voter should be able to update vote

const Proposal = ({ proposalId }) => {

  const { chainInfo, network, wallet } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [proposal, setProposal] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)
  const [policy, setPolicy] = useState<any>(null)
  const [proposers, setProposers] = useState<any>(null)
  const [votes, setVotes] = useState<any>(null)

  // execution error and results
  const [execError, setExecError] = useState<string>("")
  const [execSuccess, setExecSuccess] = useState<string>("")

  // whether network is supported by coop app
  const coopChain = (
      network === choraTestnet.chainId ||
      network === choraLocal.chainId
  )

  // TODO: add hook for server url

  // whether network is a local network
  const localChain = network?.includes("-local")

  // chora server (use local server if local network)
  let serverUrl = "http://localhost:3000"
  if (!localChain) {
    serverUrl = "https://server.chora.io"
  }

  // fetch on load and value change
  useEffect(() => {
    setProposal(null)
    setError("")

    // error if network is not chora-testnet-1 (or chora-local)
    if (!coopChain) {
      setError("switch to chora-testnet-1")
    }

    // fetch proposal and metadata if network is chora-testnet-1 (or chora-local)
    if (coopChain) {
      fetchProposalAndMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo, network, proposalId])

  // fetch on load and value change
  useEffect(() => {
    setError("")
    fetchProposalProposers().catch(err => {
      setError(err.message)
    })
    fetchProposalPolicy().catch(err => {
      setError(err.message)
    })
    fetchProposalVotes().catch(err => {
      setError(err.message)
    })
  }, [proposal])

  // fetch proposal and metadata asynchronously
  const fetchProposalAndMetadata = async () => {

    let iri: string

    // fetch idx proposals from chora server
    await fetch(serverUrl + "/idx/" + network + "/group-proposal/" + proposalId)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          if (!proposal) {
            setError(res.error)
          }
        } else {
          setProposal({
            ...res["proposal"],
            status: proposalStatusToJSON(res["proposal"]["status"]),
            executor_result: proposalExecutorResultToJSON(res["proposal"]["executor_result"]),
          })
          iri = res["proposal"]["metadata"]
        }
      })

    // fetch proposal from selected network
    await fetch(chainInfo.rest + "/" + queryProposal + "/" + proposalId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          if (!proposal) {
            setError(res.message)
          }
        } else {
          setProposal(res["proposal"])
          iri = res["proposal"]["metadata"]
        }
      })

    // return if iri is empty or was never set
    if (typeof iri === "undefined" || iri === "") {
      return
    }

    // fetch proposal data from chora server
    await fetch(serverUrl + "/data/" + iri)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
          setMetadata(null)
        } else {
          const data = JSON.parse(res["jsonld"])
          if (data["@context"] !== "https://schema.chora.io/contexts/group_proposal.jsonld") {
            setError("unsupported metadata schema")
            setMetadata(null)
          } else {
            setError("")
            setMetadata(data)
          }
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }

  // fetch proposer metadata (i.e. member metadata)
  const fetchProposalProposers = async () => {

    // TODO(cosmos-sdk): query member by group id and member address

    let members = []

    // fetch members from selected network
    await fetch(chainInfo.rest + "/" + queryMembers + "/" + groupId)
        .then(res => res.json())
        .then(res => {
          if (res.code) {
            setError(res.message)
          } else {
            for (let i = 0; i < proposal["proposers"].length; i++) {
              const proposer = proposal["proposers"][i]
              const found = res["members"].find(member => member["member"]["address"] === proposer)
              if (found) {
                members.push(found["member"])
              }
            }
          }
        })

    let proposers = []

    const promise = members.map(async member => {

      // fetch member data from chora server
      await fetch(serverUrl + "/data/" + member["metadata"])
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            setError(res.error)
          } else {
            const data = JSON.parse(res["jsonld"])
            if (data["@context"] !== "https://schema.chora.io/contexts/group_member.jsonld") {
              setError("unsupported metadata schema")
            } else {
              setError("")
              proposers.push({
                address: member["address"],
                name: data["name"]
              })
            }
          }
        })
        .catch(err => {
          setError(err.message)
        })
    })

    // set state after promise all complete
    await Promise.all(promise).then(() => {
      setProposers(proposers)
    })
  }

  // fetch policy metadata
  const fetchProposalPolicy = async () => {

    let iri: string

    // fetch policy from selected network
    await fetch(chainInfo.rest + "/" + queryPolicy + "/" + proposal["group_policy_address"])
        .then(res => res.json())
        .then(res => {
          if (res.code) {
            setError(res.message)
          } else {
            iri = res["info"]["metadata"]
          }
        })

    // fetch member data from chora server
    await fetch(serverUrl + "/data/" + iri)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
        } else {
          const data = JSON.parse(res["jsonld"])
          if (data["@context"] !== "https://schema.chora.io/contexts/group_policy.jsonld") {
            setError("unsupported metadata schema")
          } else {
            setError("")
            setPolicy({
              address: proposal["group_policy_address"],
              name: data["name"]
            })
          }
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }

  // fetch proposal votes
  const fetchProposalVotes = async () => {

    // fetch votes from selected network
    await fetch(chainInfo.rest + "/" + queryVotes + "/" + proposal["id"])
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          setVotes(res["votes"])
        }
      })
  }

  // execute proposal asynchronously
  const handleExecute = async () => {

    const msg = {
      executor: wallet["bech32Address"],
      proposalId: Long.fromString(proposalId),
    } as MsgExec

    const msgAny = {
      typeUrl: "/cosmos.group.v1.MsgExec",
      value: MsgExec.encode(msg).finish(),
    }

    await signAndBroadcast(chainInfo, wallet["bech32Address"], [msgAny])
      .then(res => {
        setExecSuccess(res)
      }).catch(err => {
        setExecError(err.message)
      })
  }

  // whether votes have been finalized
  const votesFinalized = (
    proposal &&
    (
      proposal["status"] === "PROPOSAL_STATUS_ACCEPTED" ||
      proposal["status"] === "PROPOSAL_STATUS_REJECTED"
    )
  )

  // current vote of current account
  const currentVote = votes?.find(vote => vote["voter"] === wallet["bech32Address"])

  // whether proposal is executable
  const proposalExecutable = (
    proposal &&
    (
      proposal["status"] === "PROPOSAL_STATUS_ACCEPTED" &&
      (
        proposal["executor_result"] === "PROPOSAL_EXECUTOR_RESULT_NOT_RUN" ||
        proposal["executor_result"] === "PROPOSAL_EXECUTOR_RESULT_FAILURE"
      )
    )
  )

  return (
    <div className={styles.box}>
      {!proposal && !metadata && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {proposal && metadata && (
        <div>
          <div className={styles.boxOptions}>
            {!currentVote && !votesFinalized && (
              <Link to={`/proposals/vote/?id=${proposalId}`}>
                {"vote on proposal"}
              </Link>
            )}
            {currentVote && (
              <>
                {`vote submitted (${currentVote["option"]})`}
              </>
            )}
            {proposalExecutable && (
              <button onClick={handleExecute}>
                {"execute proposal"}
              </button>
            )}
            {votesFinalized && !proposalExecutable && (
              <div>
                {"no further action can be taken"}
              </div>
            )}
          </div>
          {(execSuccess || execError) && (
            <div className={styles.boxResultAbove}>
              <ResultTx
                error={execError}
                rest={chainInfo.rest}
                success={execSuccess}
              />
            </div>
          )}
          <div className={styles.boxText}>
            <h3>
              {"status"}
            </h3>
            <p>
              {proposal["status"]}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"name"}
            </h3>
            <p>
              {metadata["name"] ? metadata["name"] : "NA"}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"description"}
            </h3>
            <p>
              {metadata["description"] ? metadata["description"] : "NA"}
            </p>
          </div>
          {!proposers && proposal["proposers"] && (
            <div className={styles.boxText}>
              <h3>
                {proposal["proposers"].length > 1 ? "proposers" : "proposer"}
              </h3>
              {proposal["proposers"].map(proposer => (
                <p key={proposer}>
                  <Link to={`/members/?address=${proposer}`}>
                    {proposer}
                  </Link>
                </p>
              ))}
            </div>
          )}
          {proposers && (
            <div className={styles.boxText}>
               <h3>
                {proposers.length > 1 ? "proposers" : "proposer"}
              </h3>
              {proposers.map(proposer => (
                <p key={proposer["address"]}>
                  {`${proposer["name"]} (`}
                  <Link to={`/members/?address=${proposer["address"]}`}>
                    {proposer["address"]}
                  </Link>
                  {")"}
                </p>
              ))}
            </div>
          )}
          {!policy && (
            <div className={styles.boxText}>
              <h3>
                {"group policy address"}
              </h3>
              <p>
                <Link to={`/policies/?address=${proposal["group_policy_address"]}`}>
                  {proposal["group_policy_address"]}
                </Link>
              </p>
            </div>
          )}
          {policy && (
            <div className={styles.boxText}>
              <h3>
                {"group policy"}
              </h3>
              <p>
                {`${policy["name"]} (`}
                <Link to={`/policies/?address=${policy["address"]}`}>
                  {policy["address"]}
                </Link>
                {")"}
              </p>
            </div>
          )}
          <div className={styles.boxText}>
            <h3>
              {"submit time"}
            </h3>
            <p>
              {formatTimestamp(proposal["submit_time"])}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"voting period end"}
            </h3>
            <p>
              {formatTimestamp(proposal["voting_period_end"])}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"messages"}
            </h3>
            {(!proposal["messages"] || proposal["messages"].length === 0) && (
              <p>
                {"NA"}
              </p>
            )}
            {proposal["messages"]?.length > 0 && (
              <pre>
                <p>
                  {JSON.stringify(proposal["messages"], null, " ")}
                </p>
              </pre>
            )}
          </div>
          {votesFinalized && (
            <div>
              <div className={styles.boxText}>
                <h3>
                  {"final tally yes"}
                </h3>
                <p>
                  {proposal["final_tally_result"]["yes_count"]}
                </p>
              </div>
              <div className={styles.boxText}>
                <h3>
                  {"final tally abstain"}
                </h3>
                <p>
                  {proposal["final_tally_result"]["abstain_count"]}
                </p>
              </div>
              <div className={styles.boxText}>
                <h3>
                  {"final tally no"}
                </h3>
                <p>
                  {proposal["final_tally_result"]["no_count"]}
                </p>
              </div>
              <div className={styles.boxText}>
                <h3>
                  {"final tally no with veto"}
                </h3>
                <p>
                  {proposal["final_tally_result"]["no_with_veto_count"]}
                </p>
              </div>
              <div className={styles.boxText}>
                <h3>
                  {"executor result"}
                </h3>
                <p>
                  {proposal["executor_result"]}
                </p>
              </div>
            </div>
          )}
          <div className={styles.boxText}>
            <h3>
              {"group version"}
            </h3>
            <p>
              {proposal["group_version"]}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"group policy version"}
            </h3>
            <p>
              {proposal["group_policy_version"]}
            </p>
          </div>
        </div>
      )}
      {error && (
        <div>
          {error}
        </div>
      )}
    </div>
  )
}

export default Proposal
