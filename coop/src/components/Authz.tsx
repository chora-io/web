import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/utils/chains"

import AuthzGrant from "./AuthzGrant"

import * as styles from "./Authz.module.css"

const queryGrantsByGrantee = "cosmos/authz/v1beta1/grants/grantee"
const queryGrantsByGranter = "cosmos/authz/v1beta1/grants/granter"

const Authz = ({ address }) => {

  const { chainInfo } = useContext(WalletContext)

  // options
  const [filter, setFilter] = useState<string>("grantee")

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

    // fetch grants if network is chora-testnet-1
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
          setGrantsGranter(res["grants"])
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
      {!grantsGrantee && !grantsGranter && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {filter === "grantee" && (
        <div>
          {grantsGrantee && grantsGrantee.map((grant, i) => (
            <AuthzGrant
              key={i}
              grant={grant}
            />
          ))}
          {grantsGrantee && grantsGrantee.length === 0 && (
            <div>
              {"no authorizations granted to this account"}
            </div>
          )}
        </div>
      )}
      {filter === "granter" && (
        <div>
          {grantsGranter && grantsGranter.map((grant, i) => (
            <AuthzGrant
              key={i}
              grant={grant}
            />
          ))}
          {grantsGranter && grantsGranter.length === 0 && (
            <div>
              {"no authorizations granted by this account"}
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

export default Authz
