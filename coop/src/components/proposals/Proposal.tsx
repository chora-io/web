import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"
import * as Long from "long"

import { WalletContext } from "chora"
import { MsgExec } from "chora/api/cosmos/group/v1/tx"
import { ResultTx } from "chora/components"
import { formatTimestamp, signAndBroadcast } from "chora/utils"
import { proposalStatusToJSON, proposalExecutorResultToJSON } from "chora/api/cosmos/group/v1/types"
import { useNetworkServer } from "chora/hooks"
import { useNetworkCoop } from "../../hooks"

import { Result } from "chora/components"

import * as styles from "./Proposal.module.css"

const queryMembers = "cosmos/group/v1/group_members" // TODO(cosmos-sdk): group member query
const queryPolicy = "/cosmos/group/v1/group_policy_info"
const queryProposal = "cosmos/group/v1/proposal"
const queryVotes = "cosmos/group/v1/votes_by_proposal"

// TODO(cosmos-sdk): voter should be able to update vote

const Proposal = ({ proposalId }) => {

  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [groupId] = useNetworkCoop(chainInfo)
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | undefined>(undefined)
  const [proposal, setProposal] = useState<any>(undefined)
  const [metadata, setMetadata] = useState<any>(undefined)
  const [policy, setPolicy] = useState<any>(undefined)
  const [proposers, setProposers] = useState<any[] | undefined>(undefined)
  const [votes, setVotes] = useState<any[] | undefined>(undefined)

  // execution error and results
  const [execError, setExecError] = useState<string | undefined>(undefined)
  const [execSuccess, setExecSuccess] = useState<string | undefined>(undefined)

  // reset state on address or network change
  useEffect(() => {
    setError(undefined)
    setProposal(undefined)
    setMetadata(undefined)
    setPolicy(undefined)
    setProposers(undefined)
    setVotes(undefined)
    setExecError(undefined)
    setExecSuccess(undefined)
  }, [proposalId, chainInfo?.chainId]);

  // fetch on load and id or group change
  useEffect(() => {

    // fetch proposal from selected network
    if (groupId) {
      fetchProposal().catch(err => {
        setError(err.message)
      })
      fetchProposalVotes().catch(err => {
        setError(err.message)
      })
    }
  }, [proposalId, groupId])

  // fetch on load and proposal metadata change
  useEffect(() => {

    // fetch proposal metadata from network server
    if (proposal?.metadata) {
      fetchProposalMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [proposal?.metadata])

  // fetch on load and proposal proposers change
  useEffect(() => {

    // fetch proposal proposers from selected network and network server
    if (proposal?.proposers) {
      fetchProposalProposers().catch(err => {
        setError(err.message)
      })
    }
  }, [proposal?.proposers])

  // fetch on load and proposal policy address change
  useEffect(() => {

    // fetch proposal policy from selected network and network server
    if (proposal?.group_policy_address) {
      fetchProposalPolicy().catch(err => {
        setError(err.message)
      })
    }
  }, [proposal?.group_policy_address])

  // TODO: fetch votes voters from network server

  // fetch proposal from selected network and network server
  const fetchProposal = async () => {

    // fetch proposal from selected network
    await fetch(chainInfo.rest + "/" + queryProposal + "/" + proposalId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          if (!proposal) {
            setError(res.message)
          }
        } else {
          if (!proposal) {
            setProposal(res["proposal"])
          }
        }
      })

    // fetch idx proposals from network server
    await fetch(serverUrl + "/idx/" + network + "/group-proposal/" + proposalId)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          if (!proposal) {
            setError(res.error)
          }
        } else {
          if (!proposal) {
            setProposal({
              ...res["proposal"],
              status: proposalStatusToJSON(res["proposal"]["status"]),
              executor_result: proposalExecutorResultToJSON(res["proposal"]["executor_result"]),
            })
          }
        }
      })
  }

  // fetch proposal votes from selected network
  const fetchProposalVotes = async () => {

    // fetch votes from selected network
    await fetch(chainInfo.rest + "/" + queryVotes + "/" + proposalId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          setVotes(res["votes"])
        }
      })
  }

  // fetch proposal metadata from network server
  const fetchProposalMetadata = async () => {

    // fetch proposal metadata from network server
    await fetch(serverUrl + "/data/" + proposal.metadata)
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

  // fetch proposal proposers metadata from selected network and network server
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

      // fetch member metadata from network server
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

  // fetch proposal policy from selected network and network server
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

    if (iri) {

      // fetch member metadata from network server
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
  }

  // execute proposal
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

  // current vote of active user
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
      <div className={styles.boxOptions}>
        {currentVote && (
          <>
            {`vote submitted (${currentVote["option"]})`}
          </>
        )}
        {!error && !currentVote && !votesFinalized && (
          <Link to={`/proposals/vote/?id=${proposalId}`}>
            {"vote on proposal"}
          </Link>
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
        {error && <Result error={error} />}
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
          {proposal && proposal["status"] ? proposal["status"] : "NA"}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>
          {"name"}
        </h3>
        <p>
          {metadata && metadata["name"] ? metadata["name"] : "NA"}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>
          {"description"}
        </h3>
        <p>
          {metadata && metadata["description"] ? metadata["description"] : "NA"}
        </p>
      </div>
      {proposal && !proposers && (
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
      <div className={styles.boxText}>
        <h3>
          {"group policy address"}
        </h3>
        {!proposal && (
          <p>
            {"NA"}
          </p>
        )}
        {proposal && !policy && (
          <p>
            <Link to={`/policies/?address=${proposal["group_policy_address"]}`}>
              {proposal["group_policy_address"]}
            </Link>
          </p>
        )}
        {policy && (
          <p>
            {`${policy["name"]} (`}
            <Link to={`/policies/?address=${policy["address"]}`}>
              {policy["address"]}
            </Link>
            {")"}
          </p>
        )}
      </div>
      <div className={styles.boxText}>
        <h3>
          {"submit time"}
        </h3>
        <p>
          {proposal && proposal["submit_time"] ? formatTimestamp(proposal["submit_time"]) : "NA"}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>
          {"voting period end"}
        </h3>
        <p>
          {proposal && proposal["voting_period_end"] ? formatTimestamp(proposal["voting_period_end"]) : "NA"}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>
          {"messages"}
        </h3>
        {(!proposal || (proposal && (!proposal["messages"] || proposal["messages"].length === 0))) && (
          <p>
            {"NA"}
          </p>
        )}
        {proposal && proposal["messages"]?.length > 0 && (
          <pre>
            <p>
              {JSON.stringify(proposal["messages"], null, " ")}
            </p>
          </pre>
        )}
      </div>
      {proposal && votesFinalized && (
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
          {proposal && proposal["group_version"] ? proposal["group_version"] : "NA"}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>
          {"group policy version"}
        </h3>
        <p>
          {proposal && proposal["group_policy_version"] ? proposal["group_policy_version"] : "NA"}
        </p>
      </div>
    </div>
  )
}

export default Proposal
