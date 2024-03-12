import { Metadata } from 'next'

import ProposalVote from '@components/groups/proposals/ProposalVote'

export const metadata: Metadata = {
  title: 'chora coop',
}

import styles from './page.module.css'

const VotePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group proposal vote'}</h1>
      <ProposalVote />
    </div>
  </div>
)

export default VotePage
