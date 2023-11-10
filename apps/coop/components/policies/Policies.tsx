'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext, useEffect, useState } from 'react'

import GroupPolicyPreview from '@components/policies/PolicyPreview'
import { useGroupPolicies } from '@hooks/useGroupPolicies'

import styles from './Policies.module.css'

const Policies = () => {
  const { chainInfo } = useContext(WalletContext)

  // fetch group policies from selected network
  const [policies, error] = useGroupPolicies(chainInfo)

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
        <div>{'no policies found'}</div>
      )}
      {sortedPolicies &&
        sortedPolicies.map((policy: any) => (
          <GroupPolicyPreview key={policy['address']} policy={policy} />
        ))}
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Policies
