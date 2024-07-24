import { Metadata } from 'next'

import Proposal from '@components/network/Proposal'
import ProposalVotes from '@components/network/ProposalVotes'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const ProposalPage = () => (
  <div className={styles.page}>
    <h1>{'network proposal'}</h1>
    <Proposal />
    <h1>{'proposal votes'}</h1>
    <ProposalVotes />
  </div>
)

export default ProposalPage
