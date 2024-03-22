'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useCredit } from '@hooks/useCredit'

import styles from './Credit.module.css'

const Credit = () => {
  const { denom } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch batch and batch metadata from selected network and network server
  const [batch, metadata, error] = useCredit(chainInfo, `${denom}`)

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'denom'}</h3>
        <p>{denom ? denom : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'issuance date'}</h3>
        <p>{batch && batch['issuance_date'] ? batch['issuance_date'] : 'NA'}</p>
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
        <p>{batch && batch['start_date'] ? batch['start_date'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'end date'}</h3>
        <p>{batch && batch['end_date'] ? batch['end_date'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'metadata'}</h3>
        <p>{batch && batch['metadata'] ? batch['metadata'] : 'NA'}</p>
      </div>
      {metadata && (
        <div className={styles.boxText}>
          <p>{'metadata is available'}</p>
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

export default Credit
