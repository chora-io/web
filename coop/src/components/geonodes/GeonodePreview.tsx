import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "gatsby"

import * as styles from "./GeonodePreview.module.css"

const serverUrl = "https://server.chora.io"

const GeonodePreview = ({ node }) => {

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [metadata, setMetadata] = useState<any>(null)

  // fetch on load and value change
  useEffect(() => {
    setMetadata(null)
    setError("")

    // fetch node metadata
    fetchMetadata().catch(err => {
      setError(err.message)
    })
  }, [node["metadata"]])

  // fetch metadata asynchronously
  const fetchMetadata = async () => {

    // fetch node data from chora server
    await fetch(serverUrl + "/" + node["metadata"])
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
          setMetadata(null)
        } else if (res.context !== "https://schema.chora.io/contexts/geonode.jsonld") {
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
      {node && metadata && (
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
              {"curator"}
            </h3>
            <p>
              {node["curator"]}
            </p>
          </div>
          <Link to={`/geonodes/?id=${node["id"]}`}>
            {"view node"}
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

export default GeonodePreview
