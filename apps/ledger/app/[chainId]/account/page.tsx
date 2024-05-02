import { Metadata } from 'next'

import Authz from '@components/account/Authz'
import Feegrant from '@components/account/Feegrant'
import Account from '@components/account/Account'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const AccountPage = () => (
  <div className={styles.page}>
    <h1>{'account'}</h1>
    <Account />
    <h1>{'authorizations'}</h1>
    <Authz />
    <h1>{'fee allowances'}</h1>
    <Feegrant />
  </div>
)

export default AccountPage
