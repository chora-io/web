'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

import ProposalsListItem from '@components/groups/proposals/ProposalsListItem'
import { GroupContext } from '@contexts/GroupContext'
import { useGroupProposals } from '@hooks/useGroupProposals'

import styles from './Proposals.module.css'

const Proposals = () => {
  const { groupId } = useParams()

  const { policies, policiesError } = useContext(GroupContext)
  const { chainInfo } = useContext(WalletContext)

  // fetch group proposals from selected network
  const [proposals, proposalsError] = useGroupProposals(
    chainInfo,
    groupId,
    policies,
  )

  const error = policiesError || proposalsError

  // list options
  const [sort, setSort] = useState<string>('ascending')
  const [sorted, setSorted] = useState<any[] | null>(null)
  const [filter, setFilter] = useState<string>('submitted')
  const [filtered, setFiltered] = useState<any[] | null>(null)

  // reset state on network change
  useEffect(() => {
    setSort('ascending')
    setSorted(null)
    setFilter('submitted')
    setFiltered(null)
  }, [chainInfo?.chainId])

  // sort on load and sort change
  useEffect(() => {
    const ps = Array.isArray(proposals) ? [...proposals] : []

    if (proposals && sort === 'ascending') {
      ps.sort((a, b) => b.id - a.id)
    }

    if (proposals && sort === 'descending') {
      ps.sort((a, b) => a.id - b.id)
    }

    setSorted(ps)

    if (Array.isArray(proposals)) {
      const fs = [...proposals]

      if (proposals && sort === 'ascending') {
        fs.sort((a, b) => b.id - a.id)
      }

      if (proposals && sort === 'descending') {
        fs.sort((a, b) => a.id - b.id)
      }

      setFiltered(fs)
    }
  }, [sort, proposals])

  // filter on load and filter change
  useEffect(() => {
    if (!sorted) {
      return
    }

    let ps = sorted

    if (filter === 'submitted') {
      ps = ps.filter((v) => v.status === 'PROPOSAL_STATUS_SUBMITTED')
      setFiltered([...ps])
    }

    if (filter === 'accepted') {
      ps = ps.filter((v) => v.status === 'PROPOSAL_STATUS_ACCEPTED')
      setFiltered([...ps])
    }

    if (filter === 'rejected') {
      ps = ps.filter((v) => v.status === 'PROPOSAL_STATUS_REJECTED')
      setFiltered([...ps])
    }

    if (filter === 'nothing') {
      setFiltered(null)
    }
  }, [filter, sorted])

  return (
    <div className={styles.box}>
      <div className={styles.boxOptions}>
        <button
          className={filter === 'submitted' ? styles.active : undefined}
          onClick={() => setFilter('submitted')}
        >
          {'submitted'}
        </button>
        <button
          className={filter === 'accepted' ? styles.active : undefined}
          onClick={() => setFilter('accepted')}
        >
          {'accepted'}
        </button>
        <button
          className={filter === 'rejected' ? styles.active : undefined}
          onClick={() => setFilter('rejected')}
        >
          {'rejected'}
        </button>
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
      {!error && !filtered && (
        <div className={styles.boxText}>{'loading...'}</div>
      )}
      {!error && filtered && filtered.length === 0 && (
        <div className={styles.boxText}>
          {`no proposals with status ${filter}`}
        </div>
      )}
      {filtered &&
        filtered.map((proposal: any) => (
          <ProposalsListItem key={proposal.id} proposal={proposal} />
        ))}
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Proposals
