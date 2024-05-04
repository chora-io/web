'use client'

import * as React from 'react'
import { useContext } from 'react'

import { Result } from '../../components'
import { WalletContext } from '../../contexts'

import styles from './ClassIssuers.module.css'

const ClassIssuers = ({ issuers, error, renderAddress }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      {issuers &&
        issuers.map((issuer: any) => (
          <div className={styles.boxItem} key={issuer}>
            <div className={styles.boxText}>
              <h3>{'issuer'}</h3>
              {issuer && renderAddress ? (
                <p>{renderAddress(issuer)}</p>
              ) : (
                <p>
                  {issuer || 'NA'}
                  {wallet && issuer === wallet.bech32Address && (
                    <span className={styles.activeAccount}>
                      {'(active account)'}
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
        ))}
      <Result error={error} />
    </div>
  )
}

export default ClassIssuers
