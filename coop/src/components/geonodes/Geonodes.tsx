import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/utils/chains"

import GeonodePreview from "./GeonodePreview"

import * as styles from "./Geonodes.module.css"

const groupId = "1" // TODO: configuration file
const queryGeonodes = "chora/geonode/v1/nodes-by-curator"
const queryPolicies = "cosmos/group/v1/group_policies_by_group"

const Geonodes = () => {

  const { chainInfo } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [nodes, setNodes] = useState<any>(null)

  // fetch on load and value change
  useEffect(() => {
    setNodes(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch policies and nodes if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {
      fetchPoliciesAndNodes().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])


  // fetch policies and nodes asynchronously
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
    <div className={styles.container}>
      {!nodes && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {nodes && nodes.map(node => (
        <GeonodePreview
          key={node["id"]}
          node={node}
        />
      ))}
      {nodes && nodes.length === 0 && !error && (
        <div>
          {"no nodes found"}
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

export default Geonodes
