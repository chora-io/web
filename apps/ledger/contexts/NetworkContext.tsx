'use client'

import { WalletContext } from 'chora/contexts'
import * as React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

const queryBlocksLatest = '/cosmos/base/tendermint/v1beta1/blocks/latest'

const maxCount = 30

const NetworkContext = createContext<any>({})

const NetworkContextProvider = (props: any) => {
  const { chainInfo } = useContext(WalletContext)

  const [block, setBlock] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    setCount(0)
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

      setTimeout(() => {
        if (count < maxCount) {
          setCount(count + 1)
        }
      }, 6000) // 6 seconds
    }
  }, [chainInfo, count])

  return (
    <NetworkContext.Provider
      value={{
        block,
        error,
      }}
    >
      {props.children}
    </NetworkContext.Provider>
  )
}

export { NetworkContext, NetworkContextProvider }
