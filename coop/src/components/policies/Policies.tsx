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

  // error and success
  const [error, setError] = useState<string>("")
  const [policies, setPolicies] = useState<any>(null)

  useEffect(() => {
    setPolicies(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch policies if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {

      // async function workaround
      const fetchPolicies = async () => {

        // fetch policies from selected network
        await fetch(chainInfo.rest + "/" + queryPolicies + "/" + groupId)
          .then(res => res.json())
          .then(res => {
            if (res.code) {
              setError(res.message)
            } else {
              setPolicies(res["group_policies"])
            }
          })
      }

      // call async function
      fetchPolicies().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  return (
    <div className={styles.container}>
      {!policies && !error && (
        <div>
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
        <div>
          {error}
        </div>
      )}
    </div>
  )
}

export default Policies
