'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import { formatTimestamp } from 'chora/utils'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'
import { useGroupProposalVote } from '@hooks/useGroupProposalVote'

import styles from './ProposalVote.module.css'

const ProposalVote = () => {
  const { id, address } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch proposal vote from selected network or indexer service
  const [vote, voteError] = useGroupProposalVote(
    chainInfo,
    `${id}`,
    `${address}`,
  )

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    vote ? vote.metadata : null,
  )

  const error = voteError || metadataError

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'voter'}</h3>
        {vote ? <Address address={vote.voter} /> : 'NA'}
      </div>
      <div className={styles.boxText}>
        <h3>{'option'}</h3>
        <p>{vote ? vote.option : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'reason'}</h3>
        <p>{metadata && metadata.name ? metadata.reason : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'submit time'}</h3>
        <p>{vote ? formatTimestamp(vote['submit_time']) : 'NA'}</p>
      </div>
      <Result error={error} />
    </div>
  )
}

export default ProposalVote
