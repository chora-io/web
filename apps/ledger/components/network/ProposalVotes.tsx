'use client'

import { Result } from 'chora/components'
import { PaginationNav } from 'chora/components/tables'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext, useState } from 'react'

import { useProposalVotes } from '@hooks/useProposalVotes'

import styles from './ProposalVotes.module.css'

const ProposalVotes = () => {
  const { id } = useParams()

  const { chainInfo } = useContext(WalletContext)

  const limit = 5

  const [offset, setOffset] = useState(0)

  // fetch proposal votes from selected network
  const [votes, votesError] = useProposalVotes(
    chainInfo,
    id.toString(),
    limit,
    offset,
  )

  return (
    <div className={styles.box}>
      {votes && votes.length > 0 && (
        <>
          {votes.map((vote: any, i: number) => (
            <div key={i} className={styles.boxItem}>
              <div className={styles.boxText}>
                <h3>{'voter'}</h3>
                <p>{vote.voter}</p>
              </div>
              <div className={styles.boxText}>
                <h3>{'option'}</h3>
                <p>{vote.options[0].option}</p>
              </div>
              <div className={styles.boxText}>
                <h3>{'metadata'}</h3>
                <p>{vote.metadata || 'NA'}</p>
              </div>
            </div>
          ))}
          {limit && (
            <PaginationNav
              length={votes ? votes.length : 0}
              limit={limit}
              offset={offset}
              setOffset={setOffset}
            />
          )}
        </>
      )}
      <Result error={votesError} />
    </div>
  )
}

export default ProposalVotes
