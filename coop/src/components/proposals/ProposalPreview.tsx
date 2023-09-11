import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"

import { WalletContext } from "chora"

import * as styles from "./ProposalPreview.module.css"

const ProposalPreview = ({ proposal }) => {

  const { network } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [metadata, setMetadata] = useState<any>(null)

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

    fetchMetadata().catch(err => {
      setError(err.message)
    })
  }, [proposal["metadata"]])

  // fetch metadata asynchronously
  const fetchMetadata = async () => {

    // fetch proposal data from chora server
    await fetch(serverUrl + "/data/" + proposal["metadata"])
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
          setMetadata(null)
        } else {
          const data = JSON.parse(res["jsonld"])
          if (data["@context"] !== "https://schema.chora.io/contexts/group_proposal.jsonld") {
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
              {"name"}
            </h3>
            <p>
              {metadata["name"] ? metadata["name"] : "NA"}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"status"}
            </h3>
            <p>
              {proposal["status"]}
            </p>
          </div>
          {(proposal["status"] === "PROPOSAL_STATUS_ACCEPTED") && (
            <div className={styles.boxText}>
              <h3>
                {"executor result"}
              </h3>
              <p>
                {proposal["executor_result"]}
              </p>
            </div>
          )}
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
