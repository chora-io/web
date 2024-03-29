import { Metadata } from 'next'

import Account from '@components/account/Account'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const AccountPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'account'}</h1>
      <Account />
    </div>
  </div>
)

export default AccountPage
