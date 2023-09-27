import { useContext, useEffect, useState } from 'react'

import { WalletContext } from 'chora'
import { useNetworkCoop } from 'chora/hooks'

import MemberPreview from './MemberPreview'

import styles from './Members.module.css'

const queryMembers = 'cosmos/group/v1/group_members'

const Members = () => {
  const { chainInfo, network } = useContext(WalletContext)

  const [groupId] = useNetworkCoop(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | undefined>(undefined)
  const [members, setMembers] = useState<any>(undefined)

  // list options
  const [sort, setSort] = useState<string>('ascending')

  // reset state on network change
  useEffect(() => {
    setError(undefined)
    setMembers(undefined)
    setSort('ascending')
  }, [chainInfo?.chainId])

  // fetch on load and group or network change
  useEffect(() => {
    // fetch members from selected network
    if (groupId) {
      fetchMembers().catch((err) => {
        setError(err.message)
      })
    }
  }, [groupId, chainInfo?.chainId])

  // sort on load and sort change
  useEffect(() => {
    const ms = members ? [...members] : []

    if (members && sort === 'ascending') {
      ms.sort(
        (a: any, b: any) =>
          new Date(b['member']['added_at']).getUTCDate() -
          new Date(a['member']['added_at']).getUTCDate(),
      )
    }

    if (members && sort === 'descending') {
      ms.sort(
        (a: any, b: any) =>
          new Date(a['member']['added_at']).getUTCDate() -
          new Date(b['member']['added_at']).getUTCDate(),
      )
    }

    setMembers(ms)
  }, [sort])

  // fetch members from selected network
  const fetchMembers = async () => {
    // fetch members from selected network
    await fetch(chainInfo.rest + '/' + queryMembers + '/' + groupId)
      .then((res) => res.json())
      .then((res) => {
        if (res.code) {
          setError(res.message)
        } else {
          const ms = res['members']

          // sort ascending by default
          ms.sort(
            (a: any, b: any) =>
              new Date(b['member']['added_at']).getUTCDate() -
              new Date(a['member']['added_at']).getUTCDate(),
          )
          setSort('ascending')

          setMembers(ms)
        }
      })
  }

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
      {!error && !members && <div>{'loading...'}</div>}
      {members && members.length === 0 && <div>{'no members found'}</div>}
      {members &&
        members.map((member: any) => (
          <MemberPreview
            key={member['member']['address']}
            member={member['member']}
          />
        ))}
      {error && <div>{error}</div>}
    </div>
  )
}

export default Members
