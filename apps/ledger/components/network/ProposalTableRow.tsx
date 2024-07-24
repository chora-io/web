import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import { formatTimestamp } from 'chora/utils'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './ProposalTableRow.module.css'

const ProposalTableRow = ({ proposal, index }: any) => {
  const { chainInfo } = useContext(WalletContext)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    proposal ? proposal.metadata : null,
  )

  return (
    <tr key={index} className={proposal.jailed ? styles.jailed : undefined}>
      <td>{proposal.id}</td>
      <td style={{ maxWidth: '200px' }}>
        {metadata
          ? metadata.name || metadata.title
          : proposal && proposal.messages.length && proposal.messages[0].content
            ? proposal.messages[0].content.title
            : 'NA'}
      </td>
      <td>{proposal.status.substring(16)}</td>
      <td>{formatTimestamp(proposal['submit_time'])}</td>
      <td>{formatTimestamp(proposal['voting_start_time'])}</td>
      <td>{formatTimestamp(proposal['voting_end_time'])}</td>
      <td>
        <Link
          href={`/${chainInfo.chainId}/proposals/${proposal.id}`}
          style={{ textWrap: 'nowrap' }}
        >
          {'more info'}
        </Link>
      </td>
    </tr>
  )
}

export default ProposalTableRow
