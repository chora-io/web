import * as React from "react"
import { useContext, useState } from "react"

import {
  bionLocal,
  bionLocalX,
  choraLocal,
  choraLocalX,
  choraTestnet,
  choraTestnetX,
  regenLocal,
  regenLocalX,
  regenRedwood,
  regenRedwoodX,
} from "../chains"
import { WalletContext } from "../contexts"

import styles from "./Faucet.module.css"

const Faucet = () => {

  const { chainInfo, wallet } = useContext(WalletContext)

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

    let faucetUrl: string

    switch (chainInfo.chainId) {
      case bionLocal.chainId:
        faucetUrl = bionLocalX.faucet
        break
      case choraLocal.chainId:
        faucetUrl = choraLocalX.faucet
        break
      case choraTestnet.chainId:
        faucetUrl = choraTestnetX.faucet
        break
      case regenLocal.chainId:
        faucetUrl = regenLocalX.faucet
        break
      case regenRedwood.chainId:
        faucetUrl = regenRedwoodX.faucet
        break
      default:
        faucetUrl = "http://127.0.0.1:8000"
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
