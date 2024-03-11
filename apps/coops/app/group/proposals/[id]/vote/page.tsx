import { Metadata } from 'next'

import VoteOnProposal from '@components/proposals/VoteOnProposal'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coops',
}

const VotePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'vote on proposal'}</h1>
      <VoteOnProposal />
    </div>
  </div>
)

export default VotePage
