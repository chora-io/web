import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/utils/chains"

import { formatTimestamp } from "chora/utils/timestamp"

import * as styles from "./GroupProposal.module.css"

const queryProposal = "cosmos/group/v1/proposal"
const serverUrl = "https://server.chora.io"

const GroupProposal = ({ proposalId }) => {

  const { chainInfo } = useContext(WalletContext)

  // error and success
  const [error, setError] = useState<string>("")
  const [proposal, setProposal] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  useEffect(() => {
    setProposal(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch policies if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {

      // async function workaround
      const fetchProposalAndMetadata = async () => {

        // proposal metadata
        let iri: string

        // fetch policies from selected network
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

      // call async function
      fetchProposalAndMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  return (
    <div className={styles.container}>
      {!proposal && !metadata && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {proposal && metadata && !error && (
        <div>
          <div className={styles.item}>
            <h3>
              {"status"}
            </h3>
            <p>
              {proposal["status"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"name"}
            </h3>
            <p>
              {metadata["name"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"description"}
            </h3>
            <p>
              {metadata["description"]}
            </p>
          </div>
          {proposal["proposers"].length === 1 && (
            <div className={styles.item}>
               <h3>
                {"proposer"}
              </h3>
              <p>
                {proposal["proposers"][0]}
              </p>
            </div>
          )}
          {proposal["proposers"].length > 1 && (
            <div className={styles.item}>
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
          <div className={styles.item}>
            <h3>
              {"group policy address"}
            </h3>
            <p>
              {proposal["group_policy_address"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"submit time"}
            </h3>
            <p>
              {formatTimestamp(proposal["submit_time"])}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"voting period end"}
            </h3>
            <p>
              {formatTimestamp(proposal["voting_period_end"])}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"messages"}
            </h3>
            {proposal["messages"].length === 0 && (
              <p>
                {"no messages"}
              </p>
            )}
            {proposal["messages"].length > 0 && (
              <p>
                <pre>
                  {JSON.stringify(proposal["messages"], null, " ")}
                </pre>
              </p>
            )}
          </div>
          <div className={styles.item}>
            <h3>
              {"final tally yes"}
            </h3>
            <p>
              {proposal["final_tally_result"]["yes_count"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"final tally abstain"}
            </h3>
            <p>
              {proposal["final_tally_result"]["abstain_count"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"final tally no"}
            </h3>
            <p>
              {proposal["final_tally_result"]["no_count"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"final tally no with veto"}
            </h3>
            <p>
              {proposal["final_tally_result"]["no_with_veto_count"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"executor result"}
            </h3>
            <p>
              {proposal["executor_result"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"group version"}
            </h3>
            <p>
              {proposal["group_version"]}
            </p>
          </div>
          <div className={styles.item}>
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

export default GroupProposal
