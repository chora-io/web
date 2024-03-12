'use client'

import { WalletContext } from 'chora/contexts'
import { formatTimestamp } from 'chora/utils'
import { useContext, useEffect, useState } from 'react'

import styles from './Network.module.css'

const queryBlocksLatest = '/cosmos/base/tendermint/v1beta1/blocks/latest'

const Network = () => {
  const { chainInfo, network } = useContext(WalletContext)

  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [height, setHeight] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    setCount(0)
    setDate('')
    setTime('')
    setHeight(0)
    setError(null)
  }, [network])

  useEffect(() => {
    if (chainInfo && chainInfo.rest) {
      // fetch latest block header data
      fetch(chainInfo.rest + queryBlocksLatest)
        .then((res) => res.json())
        .then((data) => {
          setHeight(data.block.header.height)
          const timestamp = formatTimestamp(data.block.header.time)
          const split = timestamp.split(' ')
          setDate(split[0])
          setTime(split[1])
        })
        .catch((err) => {
          setError(err.message)
        })

      setTimeout(() => {
        setCount(count + 1)
      }, 6000) // 6 seconds
    }
  }, [chainInfo, count])

  return (
    <div className={styles.box}>
      <h2>{'network'}</h2>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>{'chain id'}</td>
              <td>{'latest block date'}</td>
              <td>{'latest block time'}</td>
              <td>{'latest block height'}</td>
            </tr>
          </thead>
          <tbody>
            <tr className={error ? styles.error : undefined}>
              <td>{chainInfo?.chainId || 'loading...'}</td>
              <td>{error || date || 'loading...'}</td>
              <td>{error || time || 'loading...'}</td>
              <td>{error || height || 'loading...'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Network
