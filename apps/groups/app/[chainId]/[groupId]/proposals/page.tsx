import { Metadata } from 'next'

import Proposals from '@components/groups/proposals/Proposals'
import ProposalsNav from '@components/groups/proposals/ProposalsNav'

export const metadata: Metadata = {
  title: 'chora groups',
}

import styles from './page.module.css'

const ProposalsPage = () => (
  <div className={styles.page}>
    <h1>{'group proposals'}</h1>
    <ProposalsNav />
    <Proposals />
  </div>
)

export default ProposalsPage
