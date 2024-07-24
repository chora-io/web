'use client'

import { formatTimestamp } from 'chora/utils'
import { useContext } from 'react'

import { NetworkContext } from '@contexts/NetworkContext'

import styles from './ChainInfo.module.css'
import { WalletContext } from 'chora/contexts'

const ChainInfo = () => {
  const { chainInfo } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>{'chain id'}</td>
              <td>{'chain name'}</td>
              <td>{'stake denom'}</td>
              <td>{'min stake denom'}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{chainInfo ? chainInfo.chainId : 'loading...'}</td>
              <td>{chainInfo ? chainInfo.chainName : 'loading...'}</td>
              <td>
                {chainInfo ? chainInfo.stakeCurrency.coinDenom : 'loading...'}
              </td>
              <td>
                {chainInfo
                  ? chainInfo.stakeCurrency.coinMinimalDenom
                  : 'loading...'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ChainInfo
