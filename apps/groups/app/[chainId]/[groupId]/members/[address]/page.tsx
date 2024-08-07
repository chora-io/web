import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import Authz from '@components/Authz'
import BankBalances from '@components/BankBalances'
import Feegrant from '@components/Feegrant'
import Member from '@components/groups/members/Member'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const MemberPage = () => (
  <div className={styles.page}>
    <Breadcrumb text="members" />
    <h1>{'group member'}</h1>
    <Member />
    <h1>{'bank balances'}</h1>
    <BankBalances />
    <h1>{'authorizations'}</h1>
    <Authz />
    <h1>{'fee allowances'}</h1>
    <Feegrant />
  </div>
)

export default MemberPage
