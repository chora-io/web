import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/chains"

import * as styles from "./Voucher.module.css"

const queryVoucher = "chora/voucher/v1/voucher"
const serverUrl = "https://server.chora.io/data"

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

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch voucher and metadata if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {
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
      setMetadata({ name: "NA", description: "NA" })
      return
    }

    // fetch voucher data from chora server
    await fetch(serverUrl + "/" + iri)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
          setMetadata(null)
        } else if (res.context !== "https://schema.chora.io/contexts/voucher.jsonld") {
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
              {"description"}
            </h3>
            <p>
              {metadata["description"]}
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
