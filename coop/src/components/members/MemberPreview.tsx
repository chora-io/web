import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"

import { WalletContext } from "chora"

import * as styles from "./MemberPreview.module.css"

const MemberPreview = ({ member }) => {

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
  }, [network, member["metadata"]])

  // fetch member metadata asynchronously
  const fetchMetadata = async () => {

    // fetch member data from chora server
    await fetch(serverUrl + "/data/" + member["metadata"])
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
          setMetadata(null)
        } else {
          const data = JSON.parse(res["jsonld"])
          if (data["@context"] !== "https://schema.chora.io/contexts/group_member.jsonld") {
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
      {member && metadata && (
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
              {"address"}
            </h3>
            <p>
              {member["address"]}
            </p>
          </div>
          <Link to={`/members/?address=${member["address"]}`}>
            {"view member"}
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

export default MemberPreview
