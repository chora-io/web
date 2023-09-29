'use client'

// import { Metadata } from 'next'
import { useParams } from 'next/navigation'

import ProposalVote from '@components/proposals/ProposalVote'

// export const metadata: Metadata = {
//   title: 'proposal vote',
// }

import styles from './page.module.css'

const ProposalPage = () => {
  const { id, address } = useParams()

  // TODO: validate id, otherwise error

  return (
    <div className={styles.page}>
      <div>
        <h1>{'group proposal vote'}</h1>
        <ProposalVote proposalId={id} voterAddress={address} />
      </div>
    </div>
  )
}

export default ProposalPage
