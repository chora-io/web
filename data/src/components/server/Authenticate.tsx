import * as React from "react"
import {useContext, useEffect, useState} from "react"

import { WalletContext } from "chora"
import { Result } from "chora/components"

import * as styles from "./Authenticate.module.css"

const cachedAuthToken = "chora-auth-token"

const Authenticate = () => {

  const { chainInfo, network, wallet } = useContext(WalletContext)

  // error and authentication
  const [error, setError] = useState<string>("")
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    if (chainInfo) {
      fetchAuthRecord().catch(err => {
        setError(err.message)
    }  )
    }
  }, [chainInfo])

  // get authentication record from data provider
  const fetchAuthRecord = async ()=> {

    // TODO: add hook for server url

    // whether network is a local network
    const localChain = network?.includes("-local")

    // chora server (use local server if local network)
    let serverUrl = "http://localhost:3000"
    if (!localChain) {
      serverUrl = "https://server.chora.io"
    }

    // TODO: use http-only cookies for better security
    const token = localStorage.getItem(cachedAuthToken)

    if (token) {
      await fetch(serverUrl + "/auth", {
        method: "POST",
        body: JSON.stringify({ address: wallet['bech32Address'], token }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.code) {
            setError(data.message)
          } else {
            setAuthenticated(data["authenticated"])
          }
        })
        .catch(err => {
          setError(err.message)
        })
    }
  }

  const handleAuthenticate = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")

    // TODO: add hook for server url

    // whether network is a local network
    const localChain = network?.includes("-local")

    // chora server (use local server if local network)
    let serverUrl = "http://localhost:3000"
    if (!localChain) {
      serverUrl = "https://server.chora.io"
    }

    // TODO: login alternatives using custodial accounts
    if (!wallet) {
      setError("keplr wallet not detected")
      return
    }

    // sign data and request new token
    if (!authenticated) {

      // TODO: data to sign
      const data = new Uint8Array(1)

      // signature for authentication
      let signature: any

      // sign data and set signature
      await window?.keplr?.signArbitrary(chainInfo.chainId, wallet["bech32Address"], data).then(res => {
        signature = res["signature"]
      }).catch(err => {
        setError(err.message)
      })

      // new authentication request
      await fetch(serverUrl + "/auth/keplr", {
        method: "POST",
        body: `{"address": "${wallet["bech32Address"]}", "signature": "${signature}"}`,
      })
        .then(res => res.json())
        .then(data => {
          if (data.code) {
            setError(data.message)
          } else {
            setAuthenticated(data["authenticated"])
            localStorage.setItem(cachedAuthToken, data["token"])
          }
        })
        .catch(err => {
          setError(err.message)
        })
    }
  }

  const handleUnAuthenticate = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    localStorage.removeItem(cachedAuthToken)
    setAuthenticated(false)
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"authenticate"}
        </h2>
        <p>
          {"only authenticated users can post data"}
        </p>
      </div>
      {wallet && authenticated && (
        <div className={styles.boxItem}>
          <div className={styles.boxText}>
            <h3>
              {"status"}
            </h3>
            <p>
              {`authenticated`}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"address"}
            </h3>
            <p>
              {wallet["bech32Address"]}
            </p>
          </div>
        </div>
      )}
      {wallet && !authenticated && (
        <div className={styles.boxItem}>
          <div className={styles.boxText}>
            <h3>
              {"status"}
            </h3>
            <p>
              {`not authenticated`}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"address"}
            </h3>
            <p>
              {wallet["bech32Address"]}
            </p>
          </div>
        </div>
      )}
      {!wallet && (
        <div className={styles.boxItem}>
          <p>
            {"keplr wallet not detected, unable to authenticate"}
          </p>
        </div>
      )}
      {!authenticated ? (
        <button className={styles.button} onClick={handleAuthenticate}>
          {"authenticate"}
        </button>
      ) : (
        <button className={styles.button} onClick={handleUnAuthenticate}>
          {"un-authenticate"}
        </button>
      )}
      <Result error={error} />
    </div>
  )
}

export default Authenticate
