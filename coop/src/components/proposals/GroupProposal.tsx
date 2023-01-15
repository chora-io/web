import * as React from "react"
import { useEffect, useState } from "react"

import * as styles from "./GroupProposal.module.css"

const serverUrl = "https://server.chora.io"

const GroupProposal = ({ groupId, proposal }) => {

  // error and success
  const [error, setError] = useState<string>("")
  const [metadata, setMetadata] = useState<any>(null)

  useEffect(() => {
    setMetadata(null)
    setError("")

    // async function workaround
    const fetchMetadata = async () => {

      // fetch proposal data from chora server
      await fetch(serverUrl + "/" + proposal["metadata"])
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
    fetchMetadata().catch(err => {
      setError(err.message)
    })
  }, [proposal["metadata"]])

  return (
    <div className={styles.container}>
      <div>
        {!proposal && !metadata && !error && (
          <div>
            {"loading..."}
          </div>
        )}
        {proposal && metadata && !error && (
          <div>
            <div className={styles.item}>
              <h3>
                {"proposal id"}
              </h3>
              <p>
                {proposal["id"]}
              </p>
            </div>
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
                {"submit_time"}
              </h3>
              <p>
                {proposal["submit_time"]}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"voting_period_end"}
              </h3>
              <p>
                {proposal["voting_period_end"]}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"proposers"}
              </h3>
              <p>
                {JSON.stringify(proposal["proposers"])}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"messages"}
              </h3>
              <p>
                {JSON.stringify(proposal["messages"])}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"metadata"}
              </h3>
              <p>
                {proposal["metadata"]}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"metadata name"}
              </h3>
              <p>
                {metadata["name"]}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"metadata description"}
              </h3>
              <p>
                {metadata["description"]}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"final_tally_result"}
              </h3>
              <p>
                {JSON.stringify(proposal["final_tally_result"])}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"executor_result"}
              </h3>
              <p>
                {proposal["executor_result"]}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"group_version"}
              </h3>
              <p>
                {proposal["group_version"]}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"group_policy_address"}
              </h3>
              <p>
                {proposal["group_policy_address"]}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"group_policy_version"}
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
    </div>
  )
}

export default GroupProposal
