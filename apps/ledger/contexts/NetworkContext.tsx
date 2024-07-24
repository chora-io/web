'use client'

import { WalletContext } from 'chora/contexts'
import * as React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

const queryBlocksLatest = '/cosmos/base/tendermint/v1beta1/blocks/latest'
const queryNodeInfo = '/cosmos/base/tendermint/v1beta1/node_info'

const maxCount = 30

const NetworkContext = createContext<any>({})

const NetworkContextProvider = (props: any) => {
  const { chainInfo } = useContext(WalletContext)

  const [block, setBlock] = useState<any>(null)
  const [appInfo, setAppInfo] = useState<any>(null)
  const [nodeInfo, setNodeInfo] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    setCount(0)
    setBlock(null)
    setAppInfo(null)
    setNodeInfo(null)
    setError(null)
  }, [chainInfo])

  useEffect(() => {
    if (chainInfo && chainInfo.rest) {
      // fetch latest block
      fetch(chainInfo.rest + queryBlocksLatest)
        .then((res) => res.json())
        .then((data) => {
          setBlock(data.block)
        })
        .catch((err) => {
          setError(err.message)
        })

      if (!nodeInfo) {
        // fetch node status
        fetch(chainInfo.rest + queryNodeInfo)
          .then((res) => res.json())
          .then((data) => {
            setAppInfo(data['application_version'])
            setNodeInfo(data['default_node_info'])
          })
          .catch((err) => {
            setError(err.message)
          })
      }

      setTimeout(() => {
        if (count < maxCount) {
          setCount(count + 1)
        }
      }, 6000) // 6 seconds
    }
  }, [chainInfo, appInfo, count])

  return (
    <NetworkContext.Provider
      value={{
        block,
        appInfo,
        nodeInfo,
        error,
      }}
    >
      {props.children}
    </NetworkContext.Provider>
  )
}

export { NetworkContext, NetworkContextProvider }
