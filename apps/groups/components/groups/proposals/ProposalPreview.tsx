import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import styles from './ProposalPreview.module.css'

const ProposalPreview = ({ proposal }: any) => {
  const { groupId } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, error] = useMetadata(chainInfo, proposal.metadata)

  return (
    <div className={styles.boxItem}>
      {!proposal && !metadata && !error && <div>{'loading...'}</div>}
      <div>
        <div className={styles.boxText}>
          <h3>{'name'}</h3>
          <p>{metadata && metadata['name'] ? metadata['name'] : 'NA'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'status'}</h3>
          <p>{proposal && proposal['status'] ? proposal['status'] : 'NA'}</p>
        </div>
        {proposal && proposal['status'] === 'PROPOSAL_STATUS_ACCEPTED' && (
          <div className={styles.boxText}>
            <h3>{'executor result'}</h3>
            <p>{proposal['executor_result']}</p>
          </div>
        )}
        <Link href={`/groups/${groupId}/proposals/${proposal['id']}`}>
          {'view proposal'}
        </Link>
      </div>
      {error && <div>{error}</div>}
    </div>
  )
}

export default ProposalPreview
