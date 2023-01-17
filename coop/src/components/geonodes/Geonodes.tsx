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

  // error and success
  const [error, setError] = useState<string>("")
  const [nodes, setNodes] = useState<any>(null)

  useEffect(() => {
    setNodes(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch policies if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {

      // async function workaround
      const fetchPoliciesAndNodes = async () => {

        let addresses: string[] = []

        // fetch policies from selected network
        await fetch(chainInfo.rest + "/" + queryPolicies + "/" + groupId)
          .then(res => res.json())
          .then(res => {
            if (res.code) {
              setError(res.message)
            } else {
              res["group_policies"].map(policy => {
                addresses.push(policy["address"])
              })
            }
          })

        addresses && addresses.map(async address => {

          // fetch nodes from selected network
          await fetch(chainInfo.rest + "/" + queryGeonodes + "/" + address)
            .then(res => res.json())
            .then(res => {
              if (res.code) {
                setError(res.message)
              } else if (res["nodes"].length > 0) {
                const ns = nodes || []
                res["nodes"].map(n => ns.push({ curator: address, ...n }))
                setNodes(ns)
              }
            })
        })
      }

      // call async function
      fetchPoliciesAndNodes().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

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
      {error && (
        <div>
          {error}
        </div>
      )}
    </div>
  )
}

export default Geonodes
