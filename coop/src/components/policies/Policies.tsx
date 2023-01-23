import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/utils/chains"

import GroupPolicyPreview from "./PolicyPreview"

import * as styles from "./Policies.module.css"

const groupId = "1" // TODO: configuration file
const queryPolicies = "cosmos/group/v1/group_policies_by_group"

const Policies = () => {

  const { chainInfo } = useContext(WalletContext)

  const [error, setError] = useState<string>("")
  const [policies, setPolicies] = useState<any>(null)
  const [sort, setSort] = useState<string>("ascending")

  useEffect(() => {
    setPolicies(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch policies if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {
      fetchPolicies().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  useEffect(() => {
    const ps = policies ? [...policies] : []

    if (policies && sort === "ascending") {
      ps.sort((a, b) => {
        return new Date(b["created_at"]) - new Date(a["created_at"])
      })
    }

    if (policies && sort === "descending") {
      ps.sort((a, b) => {
        return new Date(a["created_at"]) - new Date(b["created_at"])
      })
    }

    setPolicies(ps)
  }, [sort])

  // fetch policies asynchronously
  const fetchPolicies = async () => {

    // fetch policies from selected network
    await fetch(chainInfo.rest + "/" + queryPolicies + "/" + groupId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          const ps = res["group_policies"]
          ps.sort((a, b) => {
            return new Date(b["created_at"]) - new Date(a["created_at"])
          })
          setSort("ascending")
          setPolicies(ps)
        }
      })
  }

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        {sort === "descending" && (
          <button onClick={() => setSort("ascending")}>
            {"sort by newest"}
          </button>
        )}
        {sort === "ascending" && (
          <button onClick={() => setSort("descending")}>
            {"sort by oldest"}
          </button>
        )}
      </div>
      {!policies && !error && (
        <div className={styles.message}>
          {"loading..."}
        </div>
      )}
      {policies && policies.map(policy => (
        <GroupPolicyPreview
          key={policy["address"]}
          policy={policy}
        />
      ))}
      {error && (
        <div className={styles.message}>
          {error}
        </div>
      )}
    </div>
  )
}

export default Policies
