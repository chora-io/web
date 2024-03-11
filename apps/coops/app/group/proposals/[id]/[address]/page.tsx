import { Metadata } from 'next'

import ProposalVote from '@components/proposals/ProposalVote'

export const metadata: Metadata = {
  title: 'chora coops',
}

import styles from './page.module.css'

const ProposalPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group proposal vote'}</h1>
      <ProposalVote />
    </div>
  </div>
)

export default ProposalPage
