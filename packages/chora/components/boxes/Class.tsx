'use client'

import * as React from 'react'
import { useContext } from 'react'

import { Result } from '..'
import { WalletContext } from '../../contexts'

import styles from './Class.module.css'

const Class = ({
  clazz,
  metadata,
  error,
  renderAddress,
  renderMetadata,
}: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'id'}</h3>
        <p>{clazz?.id || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'credit type abbrev'}</h3>
        <p>{clazz ? clazz['credit_type_abbrev'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'admin'}</h3>
        {clazz && renderAddress ? (
          <p>{renderAddress(clazz.admin)}</p>
        ) : (
          <p>
            {clazz?.admin || 'NA'}
            {wallet && clazz?.admin === wallet.bech32Address && (
              <span className={styles.activeAccount}>{'(active account)'}</span>
            )}
          </p>
        )}
      </div>
      <div className={styles.boxText}>
        <h3>{'metadata'}</h3>
        {metadata && renderMetadata ? (
          <p>{renderMetadata(clazz.metadata)}</p>
        ) : (
          <p>{clazz?.metadata || 'NA'}</p>
        )}
      </div>
      <hr />
      <div className={styles.boxText}>
        <h3>{'data stored on blockchain network'}</h3>
        <pre>
          <p>{JSON.stringify(clazz, null, ' ')}</p>
        </pre>
      </div>
      {metadata && (
        <div className={styles.boxText}>
          <h3>{'data stored with data provider service'}</h3>
          <pre>
            <p>{JSON.stringify(metadata, null, ' ')}</p>
          </pre>
        </div>
      )}
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Class
