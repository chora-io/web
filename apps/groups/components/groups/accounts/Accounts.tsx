'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext, useEffect, useState } from 'react'

import AccountsListItem from '@components/groups/accounts/AccountsListItem'
import { GroupContext } from '@contexts/GroupContext'

import styles from './Accounts.module.css'

const Accounts = () => {
  const { policies, policiesError: error } = useContext(GroupContext)
  const { chainInfo } = useContext(WalletContext)

  // list options
  const [sort, setSort] = useState<string>('ascending')
  const [sortedPolicies, setSortedPolicies] = useState<any[] | null>(null)

  // reset state on network or policies change
  useEffect(() => {
    setSortedPolicies(null)
    setSort('ascending')
  }, [chainInfo?.chainId, policies])

  // sort on load and sort or policies change
  useEffect(() => {
    const ps = Array.isArray(policies) ? [...policies] : []

    if (policies && sort === 'ascending') {
      ps.sort(
        (a: any, b: any) =>
          new Date(b['created_at']).getUTCDate() -
          new Date(a['created_at']).getUTCDate(),
      )
    }

    if (policies && sort === 'descending') {
      ps.sort(
        (a: any, b: any) =>
          new Date(a['created_at']).getUTCDate() -
          new Date(b['created_at']).getUTCDate(),
      )
    }

    setSortedPolicies(ps)
  }, [sort, policies])

  return (
    <div className={styles.box}>
      <div className={styles.boxOptions}>
        {sort === 'descending' && (
          <button onClick={() => setSort('ascending')}>
            {'sort by newest'}
          </button>
        )}
        {sort === 'ascending' && (
          <button onClick={() => setSort('descending')}>
            {'sort by oldest'}
          </button>
        )}
      </div>
      {!error && !sortedPolicies && (
        <div className={styles.boxText}>{'loading...'}</div>
      )}
      {!error && sortedPolicies && sortedPolicies.length === 0 && (
        <div className={styles.boxText}>{'no accounts found'}</div>
      )}
      {sortedPolicies &&
        sortedPolicies.map((policy: any) => (
          <AccountsListItem key={policy['address']} policy={policy} />
        ))}
      <Result error={error} />
    </div>
  )
}

export default Accounts
