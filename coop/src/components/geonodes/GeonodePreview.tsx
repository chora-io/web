import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "gatsby"

import * as styles from "./GeonodePreview.module.css"

const serverUrl = "https://server.chora.io"

const GeonodePreview = ({ node }) => {

  // error and success
  const [error, setError] = useState<string>("")
  const [metadata, setMetadata] = useState<any>(null)

  useEffect(() => {
    setMetadata(null)
    setError("")

    // async function workaround
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

    // call async function
    fetchMetadata().catch(err => {
      setError(err.message)
    })
  }, [node["metadata"]])

  return (
    <div className={styles.container}>
      <div>
        {!node && !metadata && !error && (
          <div>
            {"loading..."}
          </div>
        )}
        {node && metadata && !error && (
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
    </div>
  )
}

export default GeonodePreview
