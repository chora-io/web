import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { useNetworkCoop } from "../../hooks"

import { Result } from "chora/components"
import GeonodePreview from "./GeonodePreview"

import * as styles from "./Geonodes.module.css"

const queryGeonodes = "chora/geonode/v1/nodes-by-curator"
const queryPolicies = "cosmos/group/v1/group_policies_by_group"

const Geonodes = () => {

  const { chainInfo } = useContext(WalletContext)

  const [groupId] = useNetworkCoop(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | undefined>(undefined)
  const [nodes, setNodes] = useState<any[] | undefined>(undefined)

  // reset state on network change
  useEffect(() => {
    setError(undefined)
    setNodes(undefined)
  }, [chainInfo?.chainId]);

  // fetch on load and group change
  useEffect(() => {

    // fetch policies and nodes from selected network
    if (groupId) {
      fetchPoliciesAndNodes().catch(err => {
        setError(err.message)
      })
    }
  }, [groupId])

  // fetch policies and nodes from selected network
  const fetchPoliciesAndNodes = async () => {

    let addrs: string[] = []

    // fetch policies from selected network
    await fetch(chainInfo.rest + "/" + queryPolicies + "/" + groupId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          res["group_policies"].map(policy => {
            addrs.push(policy["address"])
          })
        }
      })

    const ns: any[] = []

    // create promise for all async fetch calls
    const promise = addrs.map(async addr => {

      // fetch nodes from selected network
      await fetch(chainInfo.rest + "/" + queryGeonodes + "/" + addr)
        .then(res => res.json())
        .then(res => {
          if (res.code) {
            setError(res.message)
          } else {
            res["nodes"].map(n => ns.push({ curator: addr, ...n }))
          }
        })
    })

    // set state after promise all complete
    await Promise.all(promise).then(() => {
      setNodes(ns)
    })
  }

  return (
    <div className={styles.box}>
      {!error && !nodes && (
        <div>
          {"loading..."}
        </div>
      )}
      {!error && nodes && nodes.length === 0 && (
        <div>
          {"no nodes found"}
        </div>
      )}
      {nodes && nodes.map(node => (
        <GeonodePreview
          key={node["id"]}
          node={node}
        />
      ))}
      <Result error={error} />
    </div>
  )
}

export default Geonodes
