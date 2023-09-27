import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'

import { WalletContext } from 'chora'
import { voteOptionToJSON } from 'chora/api/cosmos/group/v1/types'
import { Result } from 'chora/components'
import { useNetworkCoop, useNetworkServer } from 'chora/hooks'

import styles from './ProposalVotes.module.css'

const queryMembers = 'cosmos/group/v1/group_members' // TODO(cosmos-sdk): group member query
const queryVotes = 'cosmos/group/v1/votes_by_proposal'

const ProposalVotes = ({ proposalId }: any) => {
  const { chainInfo, network } = useContext(WalletContext)

  const [groupId] = useNetworkCoop(chainInfo)
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | undefined>(undefined)
  const [votes, setVotes] = useState<any[] | undefined>(undefined)
  const [voters, setVoters] = useState<any[] | undefined>(undefined)

  // reset state on proposal or network change
  useEffect(() => {
    setError(undefined)
    setVotes(undefined)
    setVoters(undefined)
  }, [proposalId, chainInfo?.chainId])

  // fetch on load and proposal or group change
  useEffect(() => {
    // fetch proposal and votes from selected network
    if (groupId) {
      fetchVotesAndVoters().catch((err) => {
        setError(err.message)
      })
    }
  }, [proposalId, groupId])

  // fetch votes and voters from selected network and network server
  const fetchVotesAndVoters = async () => {
    let vs: any[] = []

    // fetch votes from selected network
    await fetch(chainInfo.rest + '/' + queryVotes + '/' + proposalId)
      .then((res) => res.json())
      .then((res) => {
        if (res.code) {
          setError(res.message)
        } else {
          res['votes'].map((v: any) => vs.push(v))
        }
      })

    // fetch idx votes from network server
    await fetch(serverUrl + '/idx/' + network + '/group-votes/' + proposalId)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          if (!votes) {
            setError(res.error)
          }
        } else {
          res['votes']?.map((v: any) =>
            vs.push({
              ...v,
              option: voteOptionToJSON(v['option']),
            }),
          )
        }
      })

    // filter out duplicates (if both on chain and indexed)
    // vs = [...new Map(vs.map((v: any) => [v["voter"], v])).values()] // TODO: iterable iterator

    setVotes(vs)

    // TODO(cosmos-sdk): query member by group id and member address

    let members: any[] = []

    // fetch members from selected network
    await fetch(chainInfo.rest + '/' + queryMembers + '/' + groupId)
      .then((res) => res.json())
      .then((res) => {
        if (res.code) {
          setError(res.message)
        } else {
          for (let i = 0; i < vs.length; i++) {
            const voter = vs[i]['voter']
            const option = vs[i]['option']
            const found = res['members'].find(
              (member: any) => member['member']['address'] === voter,
            )
            if (found) {
              members.push({ option, ...found['member'] })
            }
          }
        }
      })

    let voters: any[] = []

    const promise = members.map(async (member) => {
      // fetch member metadata from network server
      await fetch(serverUrl + '/data/' + member['metadata'])
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            setError(res.error)
          } else {
            const data = JSON.parse(res['jsonld'])
            if (
              data['@context'] !==
              'https://schema.chora.io/contexts/group_member.jsonld'
            ) {
              setError('unsupported metadata schema')
            } else {
              setError('')
              voters.push({
                address: member['address'],
                name: data['name'],
                option: member['option'],
              })
            }
          }
        })
        .catch((err) => {
          setError(err.message)
        })
    })

    // set state after promise all complete
    await Promise.all(promise).then(() => {
      setVoters(voters)
    })
  }

  return (
    <div className={styles.box}>
      {!votes && !error && <div>{'loading...'}</div>}
      {!voters &&
        votes &&
        votes.map((vote) => (
          <div className={styles.boxItem} key={vote['voter']}>
            <div className={styles.boxText}>
              <h3>{'voter'}</h3>
              <p>{vote['voter']}</p>
            </div>
            <div className={styles.boxText}>
              <h3>{'option'}</h3>
              <p>{vote['option']}</p>
            </div>
            <Link href={`/proposals/?id=${proposalId}&voter=${vote['voter']}`}>
              {'view vote'}
            </Link>
          </div>
        ))}
      {voters &&
        voters.map((voter) => (
          <div className={styles.boxItem} key={voter['address']}>
            <div className={styles.boxText}>
              <h3>{'voter'}</h3>
              <p key={voter['address']}>
                {`${voter['name']} (`}
                <Link href={`/members/?address=${voter['address']}`}>
                  {voter['address']}
                </Link>
                {')'}
              </p>
            </div>
            <div className={styles.boxText}>
              <h3>{'option'}</h3>
              <p>{voter['option']}</p>
            </div>
            <Link
              href={`/proposals/?id=${proposalId}&voter=${voter['address']}`}
            >
              {'view vote'}
            </Link>
          </div>
        ))}
      {votes && votes.length === 0 && !error && <div>{'no votes found'}</div>}
      <Result error={error} />
    </div>
  )
}

export default ProposalVotes
