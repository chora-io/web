import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "gatsby"

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
    </div>
  )
}

export default GroupPolicy
