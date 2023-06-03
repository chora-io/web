import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"
import * as Long from "long"

import { WalletContext } from "chora"
import { MsgExec } from "chora/api/cosmos/group/v1/tx"
import { choraTestnet } from "chora/chains"
import { formatTimestamp } from "chora/utils/timestamp"
import { signAndBroadcast } from "chora/utils/tx"

import ResultTx from "chora/components/ResultTx"

import * as styles from "./Proposal.module.css"

const queryProposal = "cosmos/group/v1/proposal"
const serverUrl = "https://server.chora.io"

const Proposal = ({ proposalId }) => {

  const { chainInfo, wallet } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [proposal, setProposal] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // execution error and results
  const [execError, setExecError] = useState<string>("")
  const [execSuccess, setExecSuccess] = useState<string>("")

  // fetch on load and value change
  useEffect(() => {
    setProposal(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch proposal and metadata if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {
      fetchProposalAndMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  // fetch proposal and metadata asynchronously
  const fetchProposalAndMetadata = async () => {

    let iri: string

    // fetch proposal from selected network
    await fetch(chainInfo.rest + "/" + queryProposal + "/" + proposalId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          setProposal(res["proposal"])
          iri = res["proposal"]["metadata"]
        }
      })

    // return if iri is empty or was never set
    if (typeof iri === "undefined" || iri === "") {
      setMetadata({ name: "NA", description: "NA" })
      return
    }

    // fetch proposal data from chora server
    await fetch(serverUrl + "/" + iri)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
          setMetadata(null)
        } else if (res.context !== "https://schema.chora.io/contexts/group_proposal.jsonld") {
          setError("unsupported metadata schema")
          setMetadata(null)
        } else {
          setError("")
          setMetadata(JSON.parse(res["jsonld"]))
        }
      })
      .catch(err => {
        setError(err.message)
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

  // whether proposal is executable
  const proposalExecutable = (
    proposal &&
    (
      proposal["status"] !== "PROPOSAL_STATUS_REJECTED"
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
            {!votesFinalized && (
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
              {metadata["name"]}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"description"}
            </h3>
            <p>
              {metadata["description"]}
            </p>
          </div>
          {proposal["proposers"].length === 1 && (
            <div className={styles.boxText}>
               <h3>
                {"proposer"}
              </h3>
              <p>
                {proposal["proposers"][0]}
              </p>
            </div>
          )}
          {proposal["proposers"].length > 1 && (
            <div className={styles.boxText}>
               <h3>
                {"proposers"}
              </h3>
              {proposal["proposers"].map(proposer => (
                <p>
                  {proposer}
                </p>
              ))}
            </div>
          )}
          <div className={styles.boxText}>
            <h3>
              {"group policy address"}
            </h3>
            <p>
              {proposal["group_policy_address"]}
            </p>
          </div>
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
            {proposal["messages"].length === 0 && (
              <p>
                {"no messages"}
              </p>
            )}
            {proposal["messages"].length > 0 && (
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
