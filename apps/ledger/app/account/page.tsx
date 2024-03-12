import { Metadata } from 'next'

import Account from '@components/account/Account'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const HomePage = () => (
  <div className={styles.page}>
    <div>
      <Account />
    </div>
  </div>
)

export default HomePage
