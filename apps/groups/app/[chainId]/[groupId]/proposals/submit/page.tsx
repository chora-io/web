import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import SubmitProposal from '@components/groups/proposals/SubmitProposal'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const SubmitPage = () => (
  <div className={styles.page}>
    <Breadcrumb text="proposals" />
    <h1>{'submit proposal'}</h1>
    <SubmitProposal />
  </div>
)

export default SubmitPage
