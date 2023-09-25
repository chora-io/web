import Link from "next/link"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { Result } from "chora/components"
import { useNetworkServer } from "chora/hooks"

import { useNetworkCoop } from "@hooks"

import styles from "./PolicyPreview.module.css"

const GroupPolicy = ({ policy }: any) => {

  const { chainInfo } = useContext(WalletContext)

  const [groupId] = useNetworkCoop(chainInfo)
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | undefined>(undefined)
  const [metadata, setMetadata] = useState<any>(undefined)

  // reset state on policy or network change
  useEffect(() => {
    setError(undefined)
    setMetadata(undefined)
  }, [policy, chainInfo?.chainId]);

  // fetch on load and group or policy metadata change
  useEffect(() => {

    // fetch policy metadata from network server
    if (groupId && policy?.metadata) {
      fetchMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [groupId, policy?.metadata])

  // fetch policy metadata from network server
  const fetchMetadata = async () => {

    // TODO: handle multiple metadata formats (i.e. IRI, IPFS, JSON, etc.)

    // handle metadata as json, otherwise chora server iri
    try {

      // parse policy metadata
      const parsedMetadata = JSON.parse(policy.metadata)
      setMetadata(parsedMetadata)

    } catch(e) {

      // fetch policy metadata from network server
      await fetch(serverUrl + "/data/" + policy.metadata)
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            setError(res.error)
          } else {
            const data = JSON.parse(res["jsonld"])
            if (data["@context"] !== "https://schema.chora.io/contexts/group_policy.jsonld") {
              setError("unsupported metadata schema")
            } else {
              setMetadata(data)
            }
          }
        })
        .catch(err => {
          setError(err.message)
        })
    }
  }

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>
          {"name"}
        </h3>
        <p>
          {metadata && metadata["name"] ? metadata["name"] : "NA"}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>
          {"address"}
        </h3>
        <p>
          {policy["address"]}
        </p>
      </div>
      <Link href={`/policies/?address=${policy["address"]}`}>
        {"view policy"}
      </Link>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default GroupPolicy
