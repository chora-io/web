'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { formatTimestamp } from 'chora/utils'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useVoucherBalance } from '@hooks/useVoucherBalance'

import styles from './Balance.module.css'

const Balance = () => {
  const { id, address } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch voucher balance by voucher id and address from selected network
  const [balance, error] = useVoucherBalance(chainInfo, `${id}`, `${address}`)

  return (
    <div className={styles.box}>
      {!balance && !error && <div>{'loading...'}</div>}
      {balance && (
        <div className={styles.boxItem}>
          <div className={styles.boxText}>
            <h3>{'address'}</h3>
            <p>{balance?.address ? balance.address : 'NA'}</p>
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
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Balance
