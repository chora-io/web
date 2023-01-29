import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "gatsby"

import * as styles from "./PolicyPreview.module.css"

const serverUrl = "https://server.chora.io"

const GroupPolicy = ({ policy }) => {

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [metadata, setMetadata] = useState<any>(null)

  // fetch on load and value change
  useEffect(() => {
    setMetadata(null)
    setError("")

    fetchMetadata().catch(err => {
      setError(err.message)
    })
  }, [policy["metadata"]])

  // fetch metadata asynchronously
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

  return (
    <div className={styles.boxItem}>
      {policy && metadata && (
        <div>
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
              {"address"}
            </h3>
            <p>
              {policy["address"]}
            </p>
          </div>
          <Link to={`/policies/?address=${policy["address"]}`}>
            {"view policy"}
          </Link>
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

export default GroupPolicy
