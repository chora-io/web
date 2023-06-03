import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/chains"
import { formatTimestamp } from "chora/utils/timestamp"

import * as styles from "./Group.module.css"

const groupId = "1" // TODO: configuration file
const queryGroup = "cosmos/group/v1/group_info"
const serverUrl = "https://server.chora.io"

const Group = () => {

  const { chainInfo } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [group, setGroup] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // fetch on load and value change
  useEffect(() => {
    setGroup(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch group and metadata if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {
      fetchGroupAndMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  // fetch group and metadata asynchronously
  const fetchGroupAndMetadata = async () => {

    let iri: string

    // fetch group from selected network
    await fetch(chainInfo.rest + "/" + queryGroup + "/" + groupId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          setGroup(res.info)
          iri = res.info.metadata
        }
      })

    // return if iri is empty or was never set
    if (typeof iri === "undefined" || iri === "") {
      setMetadata({ name: "NA", description: "NA" })
      return
    }

    // fetch group data from chora server
    await fetch(serverUrl + "/" + iri)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
          setMetadata(null)
        } else if (res.context !== "https://schema.chora.io/contexts/group.jsonld") {
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
    <div className={styles.box}>
      <div>
        {!group && !metadata && !error && (
          <div>
            {"loading..."}
          </div>
        )}
        {group && metadata && (
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
                {"admin"}
              </h3>
              <p>
                {group["admin"]}
              </p>
            </div>
            <div className={styles.boxText}>
              <h3>
                {"created at"}
              </h3>
              <p>
                {formatTimestamp(group["created_at"])}
              </p>
            </div>
            <div className={styles.boxText}>
              <h3>
                {"version"}
              </h3>
              <p>
                {group["version"]}
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
    </div>
  )
}

export default Group
