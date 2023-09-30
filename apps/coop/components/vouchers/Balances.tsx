import { WalletContext } from 'chora'
import { Result } from 'chora/components'
import Link from 'next/link'
import { useContext } from 'react'

import Address from '@components/Address'
import { useVoucherBalances } from '@hooks/useVoucherBalances'

import styles from './Balances.module.css'

const Balances = ({ voucherId }: { voucherId: string }) => {
  const { chainInfo } = useContext(WalletContext)

  // fetch voucher balances from selected network
  const [balances, error] = useVoucherBalances(chainInfo, voucherId)

  console.log('balances', balances)

  return (
    <div className={styles.box}>
      {!error && !balances && <div>{'loading...'}</div>}
      {!error && balances && balances.length === 0 && (
        <div>{'no balances found'}</div>
      )}
      {balances &&
        balances.map((balance) => (
          <div className={styles.boxItem} key={balance['address']}>
            <div className={styles.boxText}>
              <h3>{'address'}</h3>
              <p>
                {balance && balance['address'] ? (
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
            <Link href={`/vouchers/${voucherId}/${balance['address']}`}>
              {'view balance'}
            </Link>
          </div>
        ))}
      <Result error={error} />
    </div>
  )
}

export default Balances
