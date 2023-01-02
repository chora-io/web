import * as React from "react"
import { useEffect, useState } from "react"

import * as styles from "./NodeJSON.module.css"

const localServerUrl = "http://localhost:3000"
const remoteServerUrl = "https://server.chora.io"

const NodeJSON = ({ iri }) => {

  let serverUrl = remoteServerUrl
  if (typeof window !== "undefined" && (
      window.location.hostname == "0.0.0.0" ||
      window.location.hostname == "127.0.0.1" ||
      window.location.hostname == "localhost"
    )
  ) { serverUrl = localServerUrl }

  // json
  const [json, setJSON] = useState<any>(null)

  // error
  const [error, setError] = useState<string>("")

  useEffect(() => {
    fetch(serverUrl + "/" + iri)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
          setJSON(null)
        } else if (res.context !== "https://schema.chora.io/contexts/geonode.jsonld") {
          setError("unsupported metadata schema")
          setJSON(null)
        } else {
          setError("")
          setJSON(JSON.parse(res.jsonld))
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }, [json === null])

  return (
    <>
      {error !== "" && (
        <div className={styles.error}>
          {error}
        </div>
      )}
      {json !== null && (
        <div className={styles.json}>
          <div>
            {"name: " + json.name}
          </div>
          <div>
            {"description: " + json.description}
          </div>
          <div>
            {"latitude: " + json.geo.latitude}
          </div>
          <div>
            {"longitude: " + json.geo.longitude}
          </div>
        </div>
      )}
    </>
  )
}

export default NodeJSON
