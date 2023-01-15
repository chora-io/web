import * as React from "react"
import { useEffect, useState } from "react"

import * as styles from "./GroupPolicy.module.css"

const serverUrl = "https://server.chora.io"

const GroupPolicy = ({ policy }) => {

  // error and success
  const [error, setError] = useState<string>("")
  const [metadata, setMetadata] = useState<any>(null)

  useEffect(() => {
    setMetadata(null)
    setError("")

    // async function workaround
    const fetchMetadata = async () => {

      // fetch policy data from chora server
      await fetch(serverUrl + "/" + policy["metadata"])
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            setError(res.error)
            setMetadata(null)
          } else if (res.context !== "https://schema.chora.io/contexts/group_policy.jsonld") {
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
  }, [policy["metadata"]])

  return (
    <div className={styles.container}>
      <div>
        {!policy && !metadata && !error && (
          <div>
            {"loading..."}
          </div>
        )}
        {policy && metadata && !error && (
          <div>
            <div className={styles.item}>
              <h3>
                {"group id"}
              </h3>
              <p>
                {policy["group_id"]}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"version"}
              </h3>
              <p>
                {policy["version"]}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"created at"}
              </h3>
              <p>
                {policy["created_at"]}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"admin"}
              </h3>
              <p>
                {policy["admin"]}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"address"}
              </h3>
              <p>
                {policy["address"]}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"decision policy"}
              </h3>
              <p>
                {JSON.stringify(policy["decision_policy"])}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"metadata"}
              </h3>
              <p>
                {policy["metadata"]}
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

export default GroupPolicy
