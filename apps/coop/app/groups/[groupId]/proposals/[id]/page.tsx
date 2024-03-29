import { Metadata } from 'next'

import Proposal from '@components/groups/proposals/Proposal'
import ProposalVotes from '@components/groups/proposals/ProposalVotes'

export const metadata: Metadata = {
  title: 'chora coop',
}

import styles from './page.module.css'

const ProposalPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group proposal'}</h1>
      <Proposal />
      <h1>{'group proposal votes'}</h1>
      <ProposalVotes />
    </div>
  </div>
)

export default ProposalPage
