import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"

import { WalletContext } from "chora"
import { choraLocal, choraTestnet } from "chora/chains"

import * as styles from "./Geonode.module.css"

const queryNode = "chora/geonode/v1/node"
const queryPolicy = "cosmos/group/v1/group_policy_info"

const Geonode = ({ nodeId }) => {

  const { chainInfo, network } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [node, setNode] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)
  const [curator, setCurator] = useState<any>(null)

  // whether network is supported by coop app
  const coopChain = (
      network === choraTestnet.chainId ||
      network === choraLocal.chainId
  )

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
    setNode(null)
    setError("")

    // error if network is not chora-testnet-1 (or chora-local)
    if (!coopChain) {
      setError("switch to chora-testnet-1")
    }

    // fetch node and metadata if network is chora-testnet-1 (or chora-local)
    if (coopChain) {
      fetchNodeAndMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo, network, nodeId])

  useEffect(() => {
    setError("")
    fetchNodeCurator().catch(err => {
      setError(err.message)
    })
  }, [node]);

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
      return
    }

    // fetch node data from chora server
    await fetch(serverUrl + "/data/" + iri)
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
              {metadata["name"] ? metadata["name"] : "NA"}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"description"}
            </h3>
            <p>
              {metadata["description"] ? metadata["description"] : "NA"}
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
          <div className={styles.boxText}>
            <h3>
              {"latitude"}
            </h3>
            <p>
              {metadata["geo"] && metadata["geo"]["latitude"] ? metadata["geo"]["latitude"] : "NA"}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"longitude"}
            </h3>
            <p>
              {metadata["geo"] && metadata["geo"]["longitude"] ? metadata["geo"]["longitude"] : "NA"}
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
