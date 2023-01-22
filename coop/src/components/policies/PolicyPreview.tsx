import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "gatsby"

import * as styles from "./PolicyPreview.module.css"

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
      {!policy && !metadata && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {policy && metadata && !error && (
        <>
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
              {"address"}
            </h3>
            <p>
              {policy["address"]}
            </p>
          </div>
          <Link to={`/policies/?address=${policy["address"]}`}>
            {"view policy"}
          </Link>
        </>
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
