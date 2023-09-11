import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"

import { WalletContext } from "chora"

import * as styles from "./VoucherPreview.module.css"

const queryPolicy = "cosmos/group/v1/group_policy_info"

const VoucherPreview = ({ voucher }) => {

  const { chainInfo, network } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [metadata, setMetadata] = useState<any>(null)
  const [issuer, setIssuer] = useState<any>(null)

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
    fetchVoucherIssuer().catch(err => {
      setError(err.message)
    })
  }, [voucher["metadata"]])

  // fetch metadata asynchronously
  const fetchMetadata = async () => {

    // fetch voucher data from chora server
    await fetch(serverUrl + "/data/" + voucher["metadata"])
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
          setMetadata(null)
        } else {
          const data = JSON.parse(res["jsonld"])
          if (data["@context"] !== "https://schema.chora.io/contexts/voucher.jsonld") {
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

  // fetch voucher issuer
  const fetchVoucherIssuer = async () => {

    let iri: string

   // fetch policy from selected network
    await fetch(chainInfo.rest + "/" + queryPolicy + "/" + voucher["issuer"])
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
            setIssuer({
              address: voucher["issuer"],
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
      {!voucher && !metadata && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {voucher && metadata && (
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
              {"issuer"}
            </h3>
            {issuer ? (
              <p>
                {`${issuer["name"]} (`}
                  <Link to={`/policies/?address=${issuer["address"]}`}>
                    {issuer["address"]}
                  </Link>
                {")"}
              </p>
            ) : (
              <p>
                {voucher["issuer"]}
              </p>
            )}
          </div>
          <Link to={`/vouchers/?id=${voucher["id"]}`}>
            {"view voucher"}
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

export default VoucherPreview
