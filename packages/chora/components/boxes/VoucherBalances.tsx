'use client'

import * as React from 'react'
import { useContext } from 'react'

import { Result } from '../../components'
import { WalletContext } from '../../contexts'

import styles from './VoucherBalances.module.css'

const VoucherBalances = ({
  balances,
  error,
  renderAddress,
  renderLink,
}: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      {!error && !balances && <div>{'loading...'}</div>}
      {!error && balances && balances.length === 0 && (
        <div>{'no balances found'}</div>
      )}
      {Array.isArray(balances) &&
        balances.map((balance) => (
          <div className={styles.boxItem} key={balance['address']}>
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
            {renderLink && renderLink(balance.address)}
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

export default VoucherBalances
