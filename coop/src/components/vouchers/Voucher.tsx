import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"

import { WalletContext } from "chora"
import { choraLocal, choraTestnet } from "chora/chains"

import * as styles from "./Voucher.module.css"

const queryPolicy = "cosmos/group/v1/group_policy_info"
const queryVoucher = "chora/voucher/v1/voucher"

const Voucher = ({ voucherId }) => {

  const { chainInfo, network } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [voucher, setVoucher] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)
  const [issuer, setIssuer] = useState<any>(null)

  // whether network is supported by coop app
  const coopChain = (
      network === choraTestnet.chainId ||
      network === choraLocal.chainId
  )

  // whether network is a local network
  const localChain = network?.includes("-local")

  // chora server (use local server if local network)
  let serverUrl = "http://localhost:3000"
  if (!localChain) {
    serverUrl = "https://server.chora.io"
  }

  // fetch on load and value change
  useEffect(() => {
    setVoucher(null)
    setError("")

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
  }, [chainInfo, network, voucherId])

  useEffect(() => {
    setError("")
    fetchVoucherIssuer().catch(err => {
      setError(err.message)
    })
  }, [voucher]);

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
    await fetch(serverUrl + "/data/" + iri)
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
