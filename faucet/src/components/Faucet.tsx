import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "../contexts/WalletContext"

import {
  choraTestnet,
  regenRedwood,
  regenHambach,
} from "../utils/chains"

import * as styles from "./Faucet.module.css"

const Faucet = () => {

  const { chainInfo, wallet } = useContext(WalletContext)

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = () => {
    setError("")
    setSuccess("")

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
      case regenHambach.chainId:
        faucetUrl = "https://hambach.chora.io/faucet/"
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
          setSuccess(JSON.stringify(data, null, "  "))
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }

  return (
    <div>
      <div className={styles.title}>
        <div>
          {chainInfo ? chainInfo.chainName + " Faucet" : "Testnet Faucet"}
        </div>
      </div>
      <div>
        <button onClick={handleSubmit} className={styles.button}>
          {"request funds"}
        </button>
      </div>
      {error && (
        <div>
          <pre className={styles.error}>
            {error}
          </pre>
        </div>
      )}
      {success && (
        <div>
          <pre>
            {success}
          </pre>
        </div>
      )}
    </div>
  )
}

export default Faucet
