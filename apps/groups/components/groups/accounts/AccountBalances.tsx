'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useBankBalances } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { GroupContext } from '@contexts/GroupContext'

import styles from './AccountBalances.module.css'

const AccountBalances = () => {
  const { address } = useParams()

  const { policies, policiesError } = useContext(GroupContext)
  const { chainInfo } = useContext(WalletContext)

  const policy = policies?.find((p: any) => p.address === address)

  // fetch policy account bank balances from network server
  const [balances, balancesError] = useBankBalances(
    chainInfo,
    policy ? policy.address : null,
  )

  const error = policiesError || balancesError

  return (
    <div className={styles.box}>
      {!!balances &&
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
        ))}
      <Result error={error} />
    </div>
  )
}

export default AccountBalances
