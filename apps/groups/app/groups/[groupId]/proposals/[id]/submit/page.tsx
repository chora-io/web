import { Metadata } from 'next'

import VoteOnProposal from '@components/groups/proposals/VoteOnProposal'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const SubmitPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'submit vote'}</h1>
      <VoteOnProposal />
    </div>
  </div>
)

export default SubmitPage
