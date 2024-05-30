import { Metadata } from 'next'

import NetworkValidator from '@components/network/NetworkValidator'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const ValidatorPage = () => (
  <div className={styles.page}>
    <h1>{'network validator'}</h1>
    <NetworkValidator />
  </div>
)

export default ValidatorPage
