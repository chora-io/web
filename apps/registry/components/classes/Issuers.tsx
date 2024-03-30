'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useClassIssuers } from '@hooks/useClassIssuers'

import styles from './Issuers.module.css'

const Issuers = () => {
  const { id } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch class issuers from selected network and network server
  const [issuers, error] = useClassIssuers(chainInfo, `${id}`)

  return (
    <div className={styles.box}>
      {issuers &&
        issuers.map((issuer: any) => (
          <div className={styles.boxItem} key={issuer}>
            <div className={styles.boxText}>
              <h3>{'issuer'}</h3>
              <p>{issuer}</p>
            </div>
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

export default Issuers
