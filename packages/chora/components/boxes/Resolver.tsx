'use client'

import * as React from 'react'
import { useContext } from 'react'

import { Result } from '..'
import { WalletContext } from '../../contexts'

import styles from './Resolver.module.css'

const Resolver = ({ resolver, error, renderAddress }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'id'}</h3>
        <p>{resolver?.id || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'url'}</h3>
        <p>{resolver?.url || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'manager'}</h3>
        {resolver && renderAddress ? (
          <p>{renderAddress(resolver.manager)}</p>
        ) : (
          <p>
            {resolver?.manager || 'NA'}
            {wallet && resolver?.manager === wallet.bech32Address && (
              <span className={styles.activeAccount}>{'(active account)'}</span>
            )}
          </p>
        )}
      </div>
      <hr />
      <div className={styles.boxText}>
        <h3>{'data stored on blockchain network'}</h3>
        <pre>
          <p>{JSON.stringify(resolver, null, ' ')}</p>
        </pre>
      </div>
      <Result error={error} />
    </div>
  )
}

export default Resolver
