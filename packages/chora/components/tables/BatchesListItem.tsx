'use client'

import * as React from 'react'
import { useContext } from 'react'

import { WalletContext } from '../../contexts'
import { formatTimestamp } from '../../utils'

import styles from './BatchesListItem.module.css'

const BatchesListItem = ({ batch, renderAddress, renderLink }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'denom'}</h3>
        <p>{batch.denom}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'issuance date'}</h3>
        <p>{formatTimestamp(batch['issuance_date'])}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'issuer'}</h3>
        <p>
          {renderAddress ? (
            renderAddress(batch.issuer)
          ) : (
            <>
              {batch.issuer}
              {wallet && batch.issuer === wallet.bech32Address && (
                <span className={styles.activeAccount}>
                  {'(active account)'}
                </span>
              )}
            </>
          )}
        </p>
      </div>
      {renderLink && renderLink(batch.denom)}
    </div>
  )
}

export default BatchesListItem
