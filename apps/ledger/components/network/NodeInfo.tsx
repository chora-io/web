'use client'

import { formatTimestamp } from 'chora/utils'
import { useContext } from 'react'

import { NetworkContext } from '@contexts/NetworkContext'

import styles from './NodeInfo.module.css'
import { WalletContext } from 'chora/contexts'

const NodeInfo = () => {
  const { chainInfo } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>{'rpc endpoint'}</td>
              <td>{'rest endpoint'}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{chainInfo ? chainInfo.rpc : 'loading...'}</td>
              <td>{chainInfo ? chainInfo.rest : 'loading...'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default NodeInfo
