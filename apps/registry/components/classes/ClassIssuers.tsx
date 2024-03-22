'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useClassIssuers } from '@hooks/useClassIssuers'

import styles from './ClassIssuers.module.css'

const ClassIssuers = () => {
  const { id } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch class issuers from selected network and network server
  const [issuers, error] = useClassIssuers(chainInfo, `${id}`)

  return (
    <div className={styles.box}>
      {issuers &&
        issuers.map((issuer: any) => (
          <div className={styles.boxText} key={issuer}>
            <h3>{'issuer'}</h3>
            <p>{issuer}</p>
          </div>
        ))}
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default ClassIssuers
