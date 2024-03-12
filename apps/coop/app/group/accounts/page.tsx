import { Metadata } from 'next'

import Accounts from '@components/accounts/Accounts'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const AccountsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group accounts'}</h1>
      <Accounts />
    </div>
  </div>
)

export default AccountsPage
