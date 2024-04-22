'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useVoucherBalances } from 'chora/hooks'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

import styles from './Balances.module.css'

const Balances = () => {
  const { id, groupId } = useParams()
  const { chainInfo, network } = useContext(WalletContext)

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
              <p>
                {balance?.address ? (
                  <Address address={balance.address} />
                ) : (
                  'NA'
                )}
              </p>
            </div>
            <div className={styles.boxText}>
              <h3>{'total amount'}</h3>
              <p>{balance['total_amount']}</p>
            </div>
            <Link
              href={`/${network}/${groupId}/vouchers/${id}/${balance['address']}`}
            >
              {'view balance'}
            </Link>
          </div>
        ))}
      <Result error={error} />
    </div>
  )
}

export default Balances
