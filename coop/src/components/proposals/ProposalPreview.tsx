import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "gatsby"

import * as styles from "./ProposalPreview.module.css"

const serverUrl = "https://server.chora.io/data"

const ProposalPreview = ({ proposal }) => {

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
  }, [proposal["metadata"]])

  // fetch metadata asynchronously
  const fetchMetadata = async () => {

    // fetch proposal data from chora server
    await fetch(serverUrl + "/" + proposal["metadata"])
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
          setMetadata(null)
        } else {
          const data = JSON.parse(res["jsonld"])
          if (data.context !== "https://schema.chora.io/contexts/group_proposal.jsonld") {
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

  return (
    <div className={styles.boxItem}>
      {!proposal && !metadata && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {proposal && metadata && (
        <div>
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
          <Link to={`/proposals/?id=${proposal["id"]}`}>
            {"view proposal"}
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

export default ProposalPreview
