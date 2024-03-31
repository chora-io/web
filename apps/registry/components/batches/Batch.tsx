'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import { formatTimestamp } from 'chora/utils'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useBatch } from '@hooks/useBatch'

import styles from './Batch.module.css'

const Batch = () => {
  const { denom } = useParams()

  const { chainInfo } = useContext(WalletContext)

  const [batch, batchError] = useBatch(chainInfo, `${denom}`)
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    batch ? batch.metadata : null,
  )

  const error = batchError || metadataError

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'denom'}</h3>
        <p>{denom ? denom : 'NA'}</p>
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
        <p>{batch && batch['issuer'] ? batch['issuer'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'project id'}</h3>
        <p>
          {batch && batch['project_id'] ? (
            <Link href={`/projects/${batch['project_id']}`}>
              {batch['project_id']}
            </Link>
          ) : (
            'NA'
          )}
        </p>
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
        {error ? (
          <p>{batch ? batch.metadata : 'NA'}</p>
        ) : (
          <p>
            {batch && batch.metadata ? (
              <Link href={`/claims/${batch.metadata}`}>{batch.metadata}</Link>
            ) : (
              'NA'
            )}
          </p>
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
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Batch
