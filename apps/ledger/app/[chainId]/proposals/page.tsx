import { Metadata } from 'next'

import Proposals from '@components/network/Proposals'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const NetworkPage = () => (
  <div className={styles.page}>
    <h1>{'proposals'}</h1>
    <Proposals />
  </div>
)

export default NetworkPage
