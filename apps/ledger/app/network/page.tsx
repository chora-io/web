import { Metadata } from 'next'

import Network from '@components/network/Network'
import Overview from '@components/network/Overview'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const NetworkPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'network overview'}</h1>
      <Overview />
      <Network />
    </div>
  </div>
)

export default NetworkPage
