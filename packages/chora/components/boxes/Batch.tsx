'use client'

import * as React from 'react'
import { useContext } from 'react'

import { Result } from '..'
import { WalletContext } from '../../contexts'
import { formatTimestamp } from '../../utils'

import styles from './Batch.module.css'

const Batch = ({
  batch,
  metadata,
  error,
  renderAddress,
  renderMetadata,
  renderProjectId,
}: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'denom'}</h3>
        <p>{batch?.denom || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'issuance date'}</h3>
        <p>
          {batch && batch['issuance_date']
            ? formatTimestamp(batch['issuance_date'])
            : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'issuer'}</h3>
        {batch && renderAddress ? (
          <p>{renderAddress(batch.issuer)}</p>
        ) : (
          <p>
            {batch?.issuer || 'NA'}
            {wallet && batch?.issuer === wallet.bech32Address && (
              <span className={styles.activeAccount}>{'(active account)'}</span>
            )}
          </p>
        )}
      </div>
      <div className={styles.boxText}>
        <h3>{'project id'}</h3>
        {batch && renderProjectId ? (
          <p>{renderProjectId(batch['project_id'])}</p>
        ) : (
          <p>{batch ? batch['project_id'] : 'NA'}</p>
        )}
      </div>
      <div className={styles.boxText}>
        <h3>{'start date'}</h3>
        <p>
          {batch && batch['start_date']
            ? formatTimestamp(batch['start_date'])
            : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'end date'}</h3>
        <p>
          {batch && batch['end_date']
            ? formatTimestamp(batch['end_date'])
            : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'metadata'}</h3>
        {metadata && renderMetadata ? (
          <p>{renderMetadata(batch.metadata)}</p>
        ) : (
          <p>{batch?.metadata || 'NA'}</p>
        )}
      </div>
      <hr />
      <div className={styles.boxText}>
        <h3>{'data stored on blockchain network'}</h3>
        <pre>
          <p>{JSON.stringify(batch, null, ' ')}</p>
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
      <Result error={error} />
    </div>
  )
}

export default Batch
