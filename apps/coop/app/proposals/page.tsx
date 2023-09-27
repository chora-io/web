'use client'

// import { Metadata } from 'next'
import { useSearchParams } from 'next/navigation'

import Proposal from '@components/proposals/Proposal'
import Proposals from '@components/proposals/Proposals'
import ProposalsNav from '@components/proposals/ProposalsNav'
import ProposalVote from '@components/proposals/ProposalVote'
import ProposalVotes from '@components/proposals/ProposalVotes'

// export const metadata: Metadata = {
//   title: 'proposals',
// }

import styles from './page.module.css'

const ProposalsPage = () => {
  const searchParams = useSearchParams()

  const proposalId = searchParams.get('id')
  const voterAddress = searchParams.get('voter')

  return (
    <div className={styles.page}>
      {!proposalId && !voterAddress && (
        <div>
          <h1>{'group proposals'}</h1>
          <ProposalsNav />
          <Proposals />
        </div>
      )}
      {proposalId && !voterAddress && (
        <div>
          <h1>{'group proposal'}</h1>
          <Proposal proposalId={proposalId} />
          <h1>{'group proposal votes'}</h1>
          <ProposalVotes proposalId={proposalId} />
        </div>
      )}
      {proposalId && voterAddress && (
        <div>
          <h1>{'group proposal vote'}</h1>
          <ProposalVote proposalId={proposalId} voterAddress={voterAddress} />
        </div>
      )}
    </div>
  )
}

export default ProposalsPage
