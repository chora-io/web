import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"

import NodeJSON from "./NodeJSON"
import Result from "../Result"

import * as styles from "./ViewNodes.module.css"

const queryNodes = "chora/geonode/v1/nodes"

const ViewNodes = () => {

  const { chainInfo } = useContext(WalletContext)

  const [nodes, setNodes] = useState<any[]>([])
  const [error, setError] = useState<string>("")

  useEffect(() => {

    // check chain info
    if (chainInfo !== undefined) {
      setNodes([])
      setError("")

      // async function workaround
      const fetchData = async () => {

        // fetch all nodes from selected network
        await fetch(chainInfo.rest + "/" + queryNodes)
          .then(res => res.json())
          .then(res => {
            if (res.code) {
              setError(res.message)
            } else {
              setNodes(res.nodes)
            }
          })
      }

      // call async function
      fetchData().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  return (
    <>
      {nodes.map(node => (
        <div key={node.id} className={styles.node}>
          <div>
            {"id: " + node.id}
          </div>
          <div>
            {"curator: " + node.curator}
          </div>
          <div>
            <NodeJSON iri={node.metadata} />
          </div>
        </div>
      ))}
      <Result error={error} />
    </>
  )
}

export default ViewNodes
