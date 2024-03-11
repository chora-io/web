import { Metadata } from 'next'

import Overview from '@components/account/Overview'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const HomePage = () => (
  <div className={styles.page}>
    <div>
      <div className={styles.header}>
        <h1>{'account overview'}</h1>
      </div>
      <Overview />
    </div>
  </div>
)

export default HomePage
