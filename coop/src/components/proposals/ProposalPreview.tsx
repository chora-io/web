import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "gatsby"

import * as styles from "./ProposalPreview.module.css"

const serverUrl = "https://server.chora.io"

const ProposalPreview = ({ proposal }) => {

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
      {!proposal && !metadata && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {proposal && metadata && !error && (
        <>
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
          <Link to={`/proposals/?id=${proposal["id"]}`}>
            {"view proposal"}
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

export default ProposalPreview
