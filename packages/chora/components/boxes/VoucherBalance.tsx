'use client'

import * as React from 'react'
import { useContext } from 'react'

import { Result } from '../../components'
import { WalletContext } from '../../contexts'
import { formatTimestamp } from '../../utils'

import styles from './VoucherBalance.module.css'

const VoucherBalance = ({ balance, error, renderAddress }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      {!balance && !error && (
        <div className={styles.boxText}>{'loading...'}</div>
      )}
      {balance && (
        <div className={styles.boxItem}>
          <div className={styles.boxText}>
            <h3>{'address'}</h3>
            {balance && renderAddress ? (
              <p>{renderAddress(balance.address)}</p>
            ) : (
              <p>
                {balance?.address || 'NA'}
                {wallet && balance?.address === wallet.bech32Address && (
                  <span className={styles.activeAccount}>
                    {'(active account)'}
                  </span>
                )}
              </p>
            )}
          </div>
          <div className={styles.boxText}>
            <h3>{'total amount'}</h3>
            <p>{balance['total_amount']}</p>
          </div>
          {balance['amounts'].map((balance: any) => (
            <div className={styles.boxItemSub} key={balance['expiration']}>
              <div className={styles.boxText}>
                <h3>{'amount'}</h3>
                <p>{balance['amount']}</p>
              </div>
              <div className={styles.boxText}>
                <h3>{'expiration'}</h3>
                <p>{formatTimestamp(balance['expiration'])}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <Result error={error} />
    </div>
  )
}

export default VoucherBalance
