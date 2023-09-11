import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"

import { WalletContext } from "chora"

import * as styles from "./GeonodePreview.module.css"

const queryPolicy = "cosmos/group/v1/group_policy_info"

const GeonodePreview = ({ node }) => {

  const { chainInfo, network } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [metadata, setMetadata] = useState<any>(null)
  const [curator, setCurator] = useState<any>(null)

  // TODO: add hook for server url

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
    fetchNodeCurator().catch(err => {
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

  // fetch geonode curator
  const fetchNodeCurator = async () => {

    let iri: string

   // fetch policy from selected network
    await fetch(chainInfo.rest + "/" + queryPolicy + "/" + node["curator"])
        .then(res => res.json())
        .then(res => {
          if (res.code) {
            setError(res.message)
          } else {
            iri = res["info"]["metadata"]
          }
        })

    // fetch member data from chora server
    await fetch(serverUrl + "/data/" + iri)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
        } else {
          const data = JSON.parse(res["jsonld"])
          if (data["@context"] !== "https://schema.chora.io/contexts/group_policy.jsonld") {
            setError("unsupported metadata schema")
          } else {
            setError("")
            setCurator({
              address: node["curator"],
              name: data["name"]
            })
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
            {curator ? (
              <p>
                {`${curator["name"]} (`}
                  <Link to={`/policies/?address=${curator["address"]}`}>
                    {curator["address"]}
                  </Link>
                {")"}
              </p>
            ) : (
              <p>
                {node["curator"]}
              </p>
            )}
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
