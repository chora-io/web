'use client'

import { formatTimestamp } from 'chora/utils'
import { useContext } from 'react'

import { NetworkContext } from '@contexts/NetworkContext'

import styles from './LatestBlock.module.css'

const LatestBlock = () => {
  const { block, error } = useContext(NetworkContext)

  return (
    <div className={styles.box}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>{'block height'}</td>
              <td>{'block time'}</td>
              <td>{'block proposer'}</td>
              <td>{'tx count'}</td>
            </tr>
          </thead>
          <tbody>
            <tr className={error ? styles.error : undefined}>
              <td>{block ? block.header['height'] : 'loading...'}</td>
              <td>
                {block ? formatTimestamp(block.header['time']) : 'loading...'}
              </td>
              <td style={{ maxWidth: '150px' }}>
                {block ? block.header['proposer_address'] : 'loading...'}
              </td>
              <td style={{ maxWidth: '150px' }}>
                {block ? block.data.txs.length : 'loading...'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LatestBlock
