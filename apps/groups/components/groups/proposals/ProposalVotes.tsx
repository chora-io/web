'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'
import { useGroupProposalVotes } from '@hooks/useGroupProposalVotes'

import styles from './ProposalVotes.module.css'

const ProposalVotes = () => {
  const { id, groupId } = useParams()

  const { chainInfo, network } = useContext(WalletContext)

  // fetch proposal votes from selected network
  const [votes, error] = useGroupProposalVotes(chainInfo, id.toString())

  return (
    <div className={styles.box}>
      {!error && !votes && <div className={styles.boxText}>{'loading...'}</div>}
      {!error && votes && votes.length === 0 && (
        <div className={styles.boxText}>{'no votes found'}</div>
      )}
      {Array.isArray(votes) &&
        votes.map((vote) => (
          <div className={styles.boxItem} key={vote.voter}>
            <div className={styles.boxText}>
              <h3>{'voter'}</h3>
              <p>{vote?.voter ? <Address address={vote.voter} /> : 'NA'}</p>
            </div>
            <div className={styles.boxText}>
              <h3>{'option'}</h3>
              <p>{vote.option}</p>
            </div>
            <Link href={`/${network}/${groupId}/proposals/${id}/${vote.voter}`}>
              {'view vote'}
            </Link>
          </div>
        ))}
      <Result error={error} />
    </div>
  )
}

export default ProposalVotes
