import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraLocal, choraTestnet } from "chora/chains"

import * as styles from "./Voucher.module.css"

const queryVoucher = "chora/voucher/v1/voucher"
const serverUrl = process.env.CHORA_SERVER_URL
    ? process.env.CHORA_SERVER_URL + '/data'
    : "https://server.chora.io/data"

const Voucher = ({ voucherId }) => {

  const { chainInfo } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [voucher, setVoucher] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // fetch on load and value change
  useEffect(() => {
    setVoucher(null)
    setError("")

    const coopChain = chainInfo && (
        chainInfo.chainId !== choraTestnet.chainId ||
        chainInfo.chainId !== choraLocal.chainId
    )

    // error if network is not chora-testnet-1 (or chora-local)
    if (!coopChain) {
      setError("switch to chora-testnet-1")
    }

    // fetch voucher and metadata if network is chora-testnet-1 (or chora-local)
    if (coopChain) {
      fetchVoucherAndMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  // fetch voucher and metadata asynchronously
  const fetchVoucherAndMetadata = async () => {

    let iri: string

    // fetch voucher from selected network
    await fetch(chainInfo.rest + "/" + queryVoucher + "/" + voucherId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          setVoucher(res)
          iri = res["metadata"]
        }
      })

    // return if iri is empty or was never set
    if (typeof iri === "undefined" || iri === "") {
      return
    }

    // fetch voucher data from chora server
    await fetch(serverUrl + "/" + iri)
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

  return (
    <div className={styles.box}>
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
              {"issuer"}
            </h3>
            <p>
              {voucher["issuer"]}
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

export default Voucher
