import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "gatsby"

import * as styles from "./MemberPreview.module.css"

const serverUrl = "https://server.chora.io/data"

const MemberPreview = ({ member }) => {

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
  }, [member["metadata"]])

  // fetch member metadata asynchronously
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

  return (
    <div className={styles.boxItem}>
      {member && metadata && (
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
              {member["address"]}
            </p>
          </div>
          <Link to={`/members/?address=${member["address"]}`}>
            {"view member"}
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

export default MemberPreview
