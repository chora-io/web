import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import Authz from '@components/Authz'
import BankBalances from '@components/BankBalances'
import Feegrant from '@components/Feegrant'
import Account from '@components/groups/accounts/Account'
import AccountNav from '@components/groups/accounts/AccountNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const AccountPage = () => (
  <div className={styles.page}>
    <Breadcrumb text="accounts" />
    <h1>{'group account'}</h1>
    <AccountNav />
    <Account />
    <h1>{'bank balances'}</h1>
    <BankBalances />
    <h1>{'authorizations'}</h1>
    <Authz />
    <h1>{'fee allowances'}</h1>
    <Feegrant />
  </div>
)

export default AccountPage
