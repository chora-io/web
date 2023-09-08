import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"

import { WalletContext } from "chora"

import * as styles from "./GeonodePreview.module.css"

const GeonodePreview = ({ node }) => {

  const { network } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [metadata, setMetadata] = useState<any>(null)

  // whether network is a local network
  const localChain = network?.includes("-local")

  // chora server (use local server if local network)
  let serverUrl = "http://localhost:3000"
  if (!localChain) {
    serverUrl = "https://server.chora.io"
  }

  // fetch on load and value change
  useEffect(() => {
    setMetadata(null)
    setError("")

    // fetch node metadata
    fetchMetadata().catch(err => {
      setError(err.message)
    })
  }, [network, node["metadata"]])

  // fetch metadata asynchronously
  const fetchMetadata = async () => {

    // fetch node data from chora server
    await fetch(serverUrl + "/data/" + node["metadata"])
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
          setMetadata(null)
        } else {
          const data = JSON.parse(res["jsonld"])
          if (data["@context"] !== "https://schema.chora.io/contexts/geonode.jsonld") {
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
