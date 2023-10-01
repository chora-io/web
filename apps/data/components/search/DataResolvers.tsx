'use client'

import { WalletContext } from 'chora'
import { Result } from 'chora/components'
import { useContext } from 'react'

import { useDataResolvers } from '@hooks/useDataResolvers'

import styles from './DataResolvers.module.css'

const DataResolvers = () => {
  const { chainInfo } = useContext(WalletContext)

  // fetch data resolvers from selected network
  const [resolvers, error] = useDataResolvers(chainInfo)

  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'data resolvers'}</h2>
        <p>{`data resolvers registered on ${chainInfo?.chainId}`}</p>
      </div>
      {resolvers?.map((resolver) => (
        <div className={styles.boxItem} key={resolver['id']}>
          <div className={styles.boxText}>
            <h3>{'id'}</h3>
            <p>{resolver['id']}</p>
          </div>
          <div className={styles.boxText}>
            <h3>{'url'}</h3>
            <p>{resolver['url']}</p>
          </div>
          <div className={styles.boxText}>
            <h3>{'manager'}</h3>
            <p>{resolver['manager']}</p>
          </div>
        </div>
      ))}
      {chainInfo?.chainId && resolvers?.length === 0 && (
        <p>{`no data resolvers found on ${chainInfo?.chainId}`}</p>
      )}
      <Result error={error} />
    </div>
  )
}

export default DataResolvers
