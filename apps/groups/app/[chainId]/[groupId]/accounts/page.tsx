import { Metadata } from 'next'

import Accounts from '@components/groups/accounts/Accounts'
import AccountsNav from '@components/groups/accounts/AccountsNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const AccountsPage = () => (
  <div className={styles.page}>
    <h1>{'group accounts'}</h1>
    <AccountsNav />
    <Accounts />
  </div>
)

export default AccountsPage
