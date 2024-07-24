'use client'

import { WalletContext } from 'chora/contexts'
import { useContext } from 'react'

import { NetworkContext } from '@contexts/NetworkContext'

import styles from './NodeInfo.module.css'

const NodeInfo = () => {
  const { chainInfo } = useContext(WalletContext)
  const { block, nodeInfo, error } = useContext(NetworkContext)

  return (
    <div className={styles.box}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>{'moniker'}</td>
              <td>{'node id'}</td>
              <td>{'rpc endpoint'}</td>
              <td>{'rest endpoint'}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{nodeInfo ? nodeInfo.moniker : 'loading...'}</td>
              <td>{nodeInfo ? nodeInfo['default_node_id'] : 'loading...'}</td>
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
