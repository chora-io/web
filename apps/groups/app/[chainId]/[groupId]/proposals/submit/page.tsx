import { Metadata } from 'next'

import SubmitProposal from '@components/groups/proposals/SubmitProposal'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const SubmitPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'submit proposal'}</h1>
      <SubmitProposal />
    </div>
  </div>
)

export default SubmitPage
