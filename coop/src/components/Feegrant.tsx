import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraLocal, choraTestnet } from "chora/chains"

import FeegrantAllowance from "./FeegrantAllowance"

import * as styles from "./Feegrant.module.css"

const queryAllowancesByGrantee = "cosmos/feegrant/v1beta1/allowances"
const queryAllowancesByGranter = "cosmos/feegrant/v1beta1/issued"

const Feegrant = ({ address }) => {

  const { chainInfo } = useContext(WalletContext)

  // options
  const [filter, setFilter] = useState<string>("grantee")

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [allowancesGrantee, setAllowancesGrantee] = useState<any>(null)
  const [allowancesGranter, setAllowancesGranter] = useState<any>(null)

  // fetch on load and value change
  useEffect(() => {
    setAllowancesGrantee(null)
    setAllowancesGranter(null)
    setError("")

    const coopChain = chainInfo && (
        chainInfo.chainId !== choraTestnet.chainId ||
        chainInfo.chainId !== choraLocal.chainId
    )

    // error if network is not chora-testnet-1 (or chora-local)
    if (!coopChain) {
      setError("switch to chora-testnet-1")
    }

    // fetch allowances if network is chora-testnet-1 (or chora-local)
    if (coopChain) {
      fetchAllowances().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  // fetch allowances asynchronously
  const fetchAllowances = async () => {

    // fetch allowances by grantee from selected network
    await fetch(chainInfo.rest + "/" + queryAllowancesByGrantee + "/" + address)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          setAllowancesGrantee(res["allowances"])
        }
      })

    // fetch allowances by granter from selected network
    await fetch(chainInfo.rest + "/" + queryAllowancesByGranter + "/" + address)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          setAllowancesGranter(res["allowances"])
        }
      })
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxOptions}>
        <button
          className={filter === "grantee" ? styles.boxOptionActive : null}
          onClick={() => setFilter("grantee")}
        >
          {"grantee"}
        </button>
        <button
          className={filter === "granter" ? styles.boxOptionActive : null}
          onClick={() => setFilter("granter")}
        >
          {"granter"}
        </button>
      </div>
      {!allowancesGrantee && !allowancesGranter && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {filter === "grantee" && (
        <div>
          {allowancesGrantee && allowancesGrantee.map((allowance, i) => (
            <FeegrantAllowance
              key={i}
              allowance={allowance}
            />
          ))}
          {allowancesGrantee && allowancesGrantee.length === 0 && (
            <div>
              {"no fee allowances granted to this account"}
            </div>
          )}
        </div>
      )}
      {filter === "granter" && (
        <div>
          {allowancesGranter && allowancesGranter.map((allowance, i) => (
            <FeegrantAllowance
              key={i}
              allowance={allowance}
            />
          ))}
          {allowancesGranter && allowancesGranter.length === 0 && (
            <div>
              {"no fee allowances granted by this account"}
            </div>
          )}
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

export default Feegrant
