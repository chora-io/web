'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useBankBalances } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { GroupContext } from '@contexts/GroupContext'

import styles from './BankBalances.module.css'

const BankBalances = () => {
  const { address } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch bank balances by address from selected network
  const [balances, balancesError] = useBankBalances(
    chainInfo,
    address.toString(),
  )

  return (
    <div className={styles.box}>
      {!!balances && balances.length ? (
        balances.map((b: any) => (
          <>
            <div className={styles.boxItem}>
              <div className={styles.boxText}>
                <h3>{'denom'}</h3>
                <p>{b ? b.denom : 'NA'}</p>
              </div>
              <div className={styles.boxText}>
                <h3>{'amount'}</h3>
                <p>{b ? b.amount : 'NA'}</p>
              </div>
            </div>
          </>
        ))
      ) : (
        <div className={styles.boxText}>
          <p>{'no bank balances for this account'}</p>
        </div>
      )}
      <Result error={balancesError} />
    </div>
  )
}

export default BankBalances
