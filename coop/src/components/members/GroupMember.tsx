import * as React from "react"
import { useEffect, useState } from "react"

import * as styles from "./GroupMember.module.css"

const serverUrl = "https://server.chora.io"

const GroupMember = ({ groupId, member }) => {

  // error and success
  const [error, setError] = useState<string>("")
  const [metadata, setMetadata] = useState<any>(null)

  useEffect(() => {
    setMetadata(null)
    setError("")

    // async function workaround
    const fetchMetadata = async () => {

      // fetch member data from chora server
      await fetch(serverUrl + "/" + member["metadata"])
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            setError(res.error)
            setMetadata(null)
          } else if (res.context !== "https://schema.chora.io/contexts/group_member.jsonld") {
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
  }, [member["metadata"]])

  return (
    <div className={styles.container}>
      <div>
        {!member && !metadata && !error && (
          <div>
            {"loading..."}
          </div>
        )}
        {member && metadata && !error && (
          <div>
            <div className={styles.item}>
              <h3>
                {"group id"}
              </h3>
              <p>
                {groupId}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"added at"}
              </h3>
              <p>
                {member["added_at"]}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"address"}
              </h3>
              <p>
                {member["address"]}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"weight"}
              </h3>
              <p>
                {member["weight"]}
              </p>
            </div>
            <div className={styles.item}>
              <h3>
                {"metadata"}
              </h3>
              <p>
                {member["metadata"]}
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

export default GroupMember
