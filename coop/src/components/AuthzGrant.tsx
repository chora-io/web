import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/utils/chains"

import { formatTimestamp } from "chora/utils/timestamp"

import * as styles from "./Authz.module.css"

const queryGrantsByGrantee = "cosmos/authz/v1beta1/grants/grantee"
const queryGrantsByGranter = "cosmos/authz/v1beta1/grants/granter"
const serverUrl = "https://server.chora.io"

const Authz = ({ address }) => {

  const { chainInfo } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [grantsGrantee, setGrantsGrantee] = useState<any>(null)
  const [grantsGranter, setGrantsGranter] = useState<any>(null)

  // fetch on load and value change
  useEffect(() => {
    setGrantsGrantee(null)
    setGrantsGranter(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch grantsGrantee and metadata if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {
      fetchGrants().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  // fetch grants asynchronously
  const fetchGrants = async () => {

    // fetch grants by grantee from selected network
    await fetch(chainInfo.rest + "/" + queryGrantsByGrantee + "/" + address)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          console.log("queryGrantsByGrantee", res)
          setGrantsGrantee(res["grants"])
        }
      })

    // fetch grants by granter from selected network
    await fetch(chainInfo.rest + "/" + queryGrantsByGranter + "/" + address)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          console.log("queryGrantsByGranter", res)
          setGrantsGranter(res["grants"])
        }
      })
  }

  return (
    <div className={styles.container}>
      {!grantsGrantee && !grantsGranter && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {grantsGrantee && grantsGrantee.map(grant => (
        <div>
          <div className={styles.item}>
            <h3>
              {"granter"}
            </h3>
            <p>
              {grant["granter"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"grantee"}
            </h3>
            <p>
              {grant["grantee"]}
            </p>
          </div>
          {grant["authorization"]["@type"] === "" && (
            <div className={styles.item}>
              <h3>
                {"TODO"}
              </h3>
              <p>
                {grant["authorization"]}
              </p>
            </div>
          )}
          {grant["authorization"]["@type"] === "" && (
            <div className={styles.item}>
              <h3>
                {"TODO"}
              </h3>
              <p>
                {grant["authorization"]}
              </p>
            </div>
          )}
          <div className={styles.item}>
            <h3>
              {"expiration"}
            </h3>
            <p>
              {formatTimestamp(grant["expiration"])}
            </p>
          </div>
        </div>
      ))}
      {grantsGranter && grantsGranter.map(grant => (
        <div>
          <div className={styles.item}>
            <h3>
              {"granter"}
            </h3>
            <p>
              {grant["granter"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"grantee"}
            </h3>
            <p>
              {grant["grantee"]}
            </p>
          </div>
          {grant["authorization"]["@type"] === "" && (
            <div className={styles.item}>
              <h3>
                {"TODO"}
              </h3>
              <p>
                {grant["authorization"]}
              </p>
            </div>
          )}
          {grant["authorization"]["@type"] === "" && (
            <div className={styles.item}>
              <h3>
                {"TODO"}
              </h3>
              <p>
                {grant["authorization"]}
              </p>
            </div>
          )}
          <div className={styles.item}>
            <h3>
              {"expiration"}
            </h3>
            <p>
              {formatTimestamp(grant["expiration"])}
            </p>
          </div>
        </div>
      ))}
      {error && (
        <div>
          {error}
        </div>
      )}
    </div>
  )
}

export default Authz
