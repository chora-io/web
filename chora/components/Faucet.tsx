import * as React from "react"
import { useState } from "react"

import {
  choraTestnet,
  regenRedwood,
} from "../chains"

import * as styles from "./Faucet.module.css"

const Faucet = ({ chainInfo, wallet }: any) => {

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<boolean>(false)

  const handleSubmit = () => {
    setError("")
    setSuccess(false)

    if (chainInfo === undefined) {
        setError("chain must be enabled")
        return
    }

    if (wallet === undefined) {
        setError("wallet must be connected")
        return
    }

    let faucetUrl = "http://127.0.0.1:8000"

    switch (chainInfo.chainId) {
      case choraTestnet.chainId:
        faucetUrl = "https://testnet.chora.io/faucet/"
        break
      case regenRedwood.chainId:
        faucetUrl = "https://redwood.chora.io/faucet/"
        break
    }

    fetch(faucetUrl, {
      method: "POST",
      body: `{"address": "${wallet.bech32Address}"}`,
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setSuccess(true)
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }

  return (
    <div>
      <h1>
        {chainInfo ? chainInfo.chainName + " Faucet" : "Testnet Faucet"}
      </h1>
      <button onClick={handleSubmit} className={styles.button}>
        {"request funds"}
      </button>
      {error && (
        <pre className={styles.error}>
          {error}
        </pre>
      )}
      {success && (
        <pre>
          {"tokens successfully sent"}
        </pre>
      )}
    </div>
  )
}

export default Faucet
