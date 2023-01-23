import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/utils/chains"
import { formatTimestamp } from "chora/utils/timestamp"

import * as styles from "./Balance.module.css"

const queryBalance = "chora/voucher/v1/balance"

const Balance = ({ voucherId, address }) => {

  const { chainInfo } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [balance, setBalance] = useState<any>(null)

  // fetch on load and value change
  useEffect(() => {
    setBalance(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch balance if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {
      fetchBalance().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  // async balance asynchronously
  const fetchBalance = async () => {

    // fetch balance from selected network
    await fetch(chainInfo.rest + "/" + queryBalance + "/" + voucherId + "/" + address)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          setBalance(res)
        }
      })
  }

  return (
    <div className={styles.container}>
      {!balance && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {balance && !error && (
        <>
          <div className={styles.item}>
            <h3>
              {"address"}
            </h3>
            <p>
              {balance["address"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"total amount"}
            </h3>
            <p>
              {balance["total_amount"]}
            </p>
          </div>
          {balance["amounts"].map(balance => (
            <div className={styles.balance} key={balance["expiration"]}>
              <div className={styles.item}>
                <h3>
                  {"amount"}
                </h3>
                <p>
                  {balance["amount"]}
                </p>
              </div>
              <div className={styles.item}>
                <h3>
                  {"expiration"}
                </h3>
                <p>
                  {formatTimestamp(balance["expiration"])}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
      {error && (
        <div>
          {error}
        </div>
      )}
    </div>
  )
}

export default Balance
