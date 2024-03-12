import { Metadata } from 'next'

import Proposals from '@components/proposals/Proposals'
import ProposalsNav from '@components/proposals/ProposalsNav'

export const metadata: Metadata = {
  title: 'chora coop',
}

import styles from './page.module.css'

const ProposalsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group proposals'}</h1>
      <ProposalsNav />
      <Proposals />
    </div>
  </div>
)

export default ProposalsPage
