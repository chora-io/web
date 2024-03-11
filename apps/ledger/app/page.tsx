import { Metadata } from 'next'

import Network from '@components/network/Network'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const HomePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'selected network'}</h1>
      <Network />
    </div>
  </div>
)

export default HomePage
