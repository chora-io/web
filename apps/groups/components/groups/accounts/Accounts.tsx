'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

import AccountPreview from '@components/groups/accounts/AccountPreview'
import { useGroupPolicies } from '@hooks/useGroupPolicies'

import styles from './Accounts.module.css'

const Accounts = () => {
  const { groupId } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch group policies from selected network
  const [policies, error] = useGroupPolicies(chainInfo, groupId)

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
      {!error && !sortedPolicies && <div>{'loading...'}</div>}
      {sortedPolicies && sortedPolicies.length === 0 && (
        <div>{'no accounts found'}</div>
      )}
      {sortedPolicies &&
        sortedPolicies.map((policy: any) => (
          <AccountPreview key={policy['address']} policy={policy} />
        ))}
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Accounts
