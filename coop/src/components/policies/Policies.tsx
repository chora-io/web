import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { useNetworkCoop } from "../../hooks"

import GroupPolicyPreview from "./PolicyPreview"

import * as styles from "./Policies.module.css"

const queryPolicies = "cosmos/group/v1/group_policies_by_group"

const Policies = () => {

  const { chainInfo } = useContext(WalletContext)

  const [groupId] = useNetworkCoop(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | undefined>(undefined)
  const [policies, setPolicies] = useState<any[] | undefined>(undefined)

  // list options
  const [sort, setSort] = useState<string>("ascending")

  // reset state on network change
  useEffect(() => {
    setError(undefined)
    setPolicies(undefined)
    setSort("ascending")
  }, [chainInfo?.chainId]);

  // fetch on load and group change
  useEffect(() => {

    // fetch policies if network supported
    if (groupId) {
      fetchPolicies().catch(err => {
        setError(err.message)
      })
    }
  }, [groupId])

  // sort on load and sort change
  useEffect(() => {
    const ps = policies ? [...policies] : []

    if (policies && sort === "ascending") {
      ps.sort((a, b) => new Date(b["created_at"]) - new Date(a["created_at"]))
    }

    if (policies && sort === "descending") {
      ps.sort((a, b) => new Date(a["created_at"]) - new Date(b["created_at"]))
    }

    setPolicies(ps)
  }, [sort])

  // fetch policies from selected network
  const fetchPolicies = async () => {

    // fetch policies from selected network
    await fetch(chainInfo.rest + "/" + queryPolicies + "/" + groupId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          const ps = res["group_policies"]

         // sort ascending by default
          ps.sort((a, b) => new Date(b["created_at"]) - new Date(a["created_at"]))
          setSort("ascending")

          setPolicies(ps)
        }
      })
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxOptions}>
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
      {!error && !policies && (
        <div>
          {"loading..."}
        </div>
      )}
      {policies && policies.length === 0 && (
        <div>
          {"no policies found"}
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
