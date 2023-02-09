import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/utils/chains"

import * as styles from "./Balances.module.css"

const queryBalances = "chora/voucher/v1/balances-by-voucher"

const Balances = ({ voucherId }) => {

  const { chainInfo } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [balances, setBalances] = useState<any>(null)

  // fetch on load and value change
  useEffect(() => {
    setBalances(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch balances if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {
      fetchBalances().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  // fetch balances asynchronously
  const fetchBalances = async () => {

    // fetch balances from selected network
    await fetch(chainInfo.rest + "/" + queryBalances + "/" + voucherId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          setBalances(res["total_amounts"])
        }
      })
  }

  return (
    <div className={styles.box}>
      {!balances && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {balances && balances.map(balance => (
        <div className={styles.boxItem} key={balance["address"]}>
          <div className={styles.boxText}>
            <h3>
              {"address"}
            </h3>
            <p>
              {balance["address"]}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"total amount"}
            </h3>
            <p>
              {balance["total_amount"]}
            </p>
          </div>
          <Link to={`/vouchers/?id=${voucherId}&address=${balance["address"]}`}>
            {"view balance"}
          </Link>
        </div>
      ))}
      {balances && balances.length === 0 && !error && (
        <div>
          {"no balances found"}
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

export default Balances
