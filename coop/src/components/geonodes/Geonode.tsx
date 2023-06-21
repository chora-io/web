import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/chains"

import * as styles from "./Geonode.module.css"

const queryNode = "chora/geonode/v1/node"
const serverUrl = "https://server.chora.io/data"

const Geonode = ({ nodeId }) => {

  const { chainInfo } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [node, setNode] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // fetch on load and value change
  useEffect(() => {
    setNode(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch node and metadata if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {
      fetchNodeAndMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  // fetch node and metadata asynchronously
  const fetchNodeAndMetadata = async () => {

    let iri: string

    // fetch node from selected network
    await fetch(chainInfo.rest + "/" + queryNode + "/" + nodeId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          setNode(res)
          iri = res["metadata"]
        }
      })

    // return if iri is empty or was never set
    if (typeof iri === "undefined" || iri === "") {
      setMetadata({
        name: "NA",
        description: "NA",
        geo: {
          latitude: "NA",
          longitude: "NA"
        }
      })
      return
    }

    // fetch node data from chora server
    await fetch(serverUrl + "/" + iri)
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
    <div className={styles.box}>
      {!node && !metadata && !error && (
        <div>
          {"loading..."}
        </div>
      )}
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
              {"description"}
            </h3>
            <p>
              {metadata["description"]}
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
          <div className={styles.boxText}>
            <h3>
              {"latitude"}
            </h3>
            <p>
              {metadata["geo"]["latitude"]}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"longitude"}
            </h3>
            <p>
              {metadata["geo"]["longitude"]}
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
  )
}

export default Geonode
