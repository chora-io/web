import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import ProposalVote from '@components/groups/proposals/ProposalVote'

export const metadata: Metadata = {
  title: 'chora groups',
}

import styles from './page.module.css'

const VotePage = () => (
  <div className={styles.page}>
    <Breadcrumb text="proposal" />
    <h1>{'group proposal vote'}</h1>
    <ProposalVote />
  </div>
)

export default VotePage
