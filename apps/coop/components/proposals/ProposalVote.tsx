import { WalletContext } from 'chora'
import { formatTimestamp } from 'chora/utils'
import { useContext } from 'react'

import Address from '@components/Address'
import { useGroupProposalVote } from '@hooks/useGroupProposalVote'

import styles from './ProposalVote.module.css'

const ProposalVote = ({ proposalId, address }: any) => {
  const { chainInfo } = useContext(WalletContext)

  // fetch proposal vote and vote metadata from selected network and network server
  const [vote, metadata, error] = useGroupProposalVote(
    chainInfo,
    proposalId,
    address,
  )

  return (
    <div className={styles.box}>
      {!vote && !metadata && !error && <div>{'loading...'}</div>}
      {vote && metadata && (
        <div>
          <div className={styles.boxText}>
            <h3>{'voter'}</h3>
            {vote && vote['voter'] ? <Address address={vote['voter']} /> : 'NA'}
          </div>
          <div className={styles.boxText}>
            <h3>{'option'}</h3>
            <p>{vote['option']}</p>
          </div>
          <div className={styles.boxText}>
            <h3>{'reason'}</h3>
            <p>{metadata['reason'] ? metadata['reason'] : 'NA'}</p>
          </div>
          <div className={styles.boxText}>
            <h3>{'submit time'}</h3>
            <p>{formatTimestamp(vote['submit_time'])}</p>
          </div>
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  )
}

export default ProposalVote
