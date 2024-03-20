'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useVoucherBalances } from '@hooks/useVoucherBalances'

import styles from './Balances.module.css'

const Balances = () => {
  const { id } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch voucher balances from selected network
  const [balances, error] = useVoucherBalances(chainInfo, `${id}`)

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
              <p>{balance?.address ? balance.address : 'NA'}</p>
            </div>
            <div className={styles.boxText}>
              <h3>{'total amount'}</h3>
              <p>{balance['total_amount']}</p>
            </div>
            <Link href={`/vouchers/${id}/${balance['address']}`}>
              {'view balance'}
            </Link>
          </div>
        ))}
      <Result error={error} />
    </div>
  )
}

export default Balances
