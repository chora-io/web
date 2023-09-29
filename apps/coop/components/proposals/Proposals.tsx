import { useContext, useEffect, useState } from 'react'

import { WalletContext } from 'chora'
import {
  proposalExecutorResultToJSON,
  proposalStatusToJSON,
} from 'cosmos/api/cosmos/group/v1/types'
import { Result } from 'chora/components'
import { useNetworkCoop, useNetworkServer } from 'chora/hooks'

import ProposalPreview from './ProposalPreview'

import styles from './Proposals.module.css'

const queryPolicies = 'cosmos/group/v1/group_policies_by_group'
const queryProposals = 'cosmos/group/v1/proposals_by_group_policy'

const Proposals = () => {
  const { chainInfo, network } = useContext(WalletContext)

  const [groupId] = useNetworkCoop(chainInfo)
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | undefined>(undefined)
  const [proposals, setProposals] = useState<any[] | undefined>(undefined)

  // list options
  const [sort, setSort] = useState<string>('ascending')
  const [filter, setFilter] = useState<string>('submitted')
  const [filtered, setFiltered] = useState<any>(undefined)

  // reset state on network change
  useEffect(() => {
    setError(undefined)
    setProposals(undefined)
    setSort('ascending')
    setFilter('submitted')
  }, [chainInfo?.chainId])

  // fetch on load and group or network change
  useEffect(() => {
    // fetch proposals and metadata from selected network and network server
    if (groupId) {
      fetchProposals().catch((err) => {
        setError(err.message)
      })
    }
  }, [groupId, chainInfo?.chainId])

  // sort on load and sort change
  useEffect(() => {
    const ps = proposals ? [...proposals] : []

    if (proposals && sort === 'ascending') {
      ps.sort((a, b) => b.id - a.id)
    }

    if (proposals && sort === 'descending') {
      ps.sort((a, b) => a.id - b.id)
    }

    setProposals(ps)

    if (filtered) {
      const fs = [...filtered]

      if (proposals && sort === 'ascending') {
        fs.sort((a, b) => b.id - a.id)
      }

      if (proposals && sort === 'descending') {
        fs.sort((a, b) => a.id - b.id)
      }

      setFiltered(fs)
    }
  }, [sort])

  // filter on load and filter change
  useEffect(() => {
    if (!proposals) {
      return
    }

    let ps = proposals

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
      setFiltered(undefined)
    }
  }, [filter])

  // fetch proposals and metadata from selected network and network server
  const fetchProposals = async () => {
    let addrs: string[] = []

    // fetch policies from selected network
    await fetch(chainInfo.rest + '/' + queryPolicies + '/' + groupId)
      .then((res) => res.json())
      .then((res) => {
        if (res.code) {
          setError(res.message)
        } else {
          res['group_policies'].map((policy: any) => {
            addrs.push(policy['address'])
          })
        }
      })

    let ps: any[] = []

    // create promise for all async fetch calls
    const promise = addrs.map(async (addr) => {
      // fetch proposals from selected network
      await fetch(chainInfo.rest + '/' + queryProposals + '/' + addr)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            res['proposals'].map((p: any) => ps.push(p))
          }
        })
    })

    // fetch idx proposals from network server
    await fetch(serverUrl + '/idx/' + network + '/group-proposals/' + groupId)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(res.error)
        } else {
          res['proposals']?.map((p: any) =>
            ps.push({
              ...p,
              status: proposalStatusToJSON(p['status']),
              executor_result: proposalExecutorResultToJSON(
                p['executor_result'],
              ),
            }),
          )
        }
      })

    // set state after promise all complete
    await Promise.all(promise).then(() => {
      // filter out duplicates (if both on chain and indexed)
      // ps = [...new Map(ps.map((p: any) => [p["id"], p])).values()] // TODO: iterable iterator

      // sort ascending by default
      ps.sort((a, b) => b.id - a.id)
      setSort('ascending')

      // filter submitted by default
      const fps = ps.filter((v) => v.status === 'PROPOSAL_STATUS_SUBMITTED')
      setFilter('submitted')

      setProposals(ps)
      setFiltered(fps)
    })
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxOptions}>
        <button
          className={
            filter === 'submitted' ? styles.boxOptionActive : undefined
          }
          onClick={() => setFilter('submitted')}
        >
          {'submitted'}
        </button>
        <button
          className={filter === 'accepted' ? styles.boxOptionActive : undefined}
          onClick={() => setFilter('accepted')}
        >
          {'accepted'}
        </button>
        <button
          className={filter === 'rejected' ? styles.boxOptionActive : undefined}
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
      {!error && !filtered && <div>{'loading...'}</div>}
      {!error && filtered && filtered.length === 0 && (
        <div>{`no proposals with status ${filter}`}</div>
      )}
      {!error &&
        filtered &&
        filtered.map((proposal: any) => (
          <ProposalPreview key={proposal['id']} proposal={proposal} />
        ))}
      <Result error={error} />
    </div>
  )
}

export default Proposals
