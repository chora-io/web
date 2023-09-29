'use client'

// import { Metadata } from 'next'
import { useParams } from 'next/navigation'

import Proposal from '@components/proposals/Proposal'
import ProposalVotes from '@components/proposals/ProposalVotes'

// export const metadata: Metadata = {
//   title: 'proposals',
// }

import styles from './page.module.css'

const ProposalPage = () => {
  const { id } = useParams()

  // TODO: validate id, otherwise error

  return (
    <div className={styles.page}>
      <div>
        <h1>{'group proposal'}</h1>
        <Proposal proposalId={id} />
        <h1>{'group proposal votes'}</h1>
        <ProposalVotes proposalId={id} />
      </div>
    </div>
  )
}

export default ProposalPage
