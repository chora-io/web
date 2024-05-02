import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import VoteOnProposal from '@components/groups/proposals/VoteOnProposal'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const SubmitPage = () => (
  <div className={styles.page}>
    <Breadcrumb text="proposal" />
    <h1>{'submit vote'}</h1>
    <VoteOnProposal />
  </div>
)

export default SubmitPage
