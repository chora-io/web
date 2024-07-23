import { WalletContext } from 'chora/contexts'
import { formatTimestamp } from 'chora/utils'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './ProposalTableRow.module.css'

const ProposalTableRow = ({ proposal, index }: any) => {
  const { chainInfo } = useContext(WalletContext)

  return (
    <tr key={index} className={proposal.jailed ? styles.jailed : undefined}>
      <td>{proposal.id}</td>
      <td>{proposal.status}</td>
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
