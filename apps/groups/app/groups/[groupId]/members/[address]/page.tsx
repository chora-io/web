import { Metadata } from 'next'

import Authz from '@components/Authz'
import Feegrant from '@components/Feegrant'
import Member from '@components/groups/members/Member'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const MemberPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group member'}</h1>
      <Member />
      <h1>{'authorizations'}</h1>
      <Authz />
      <h1>{'fee allowances'}</h1>
      <Feegrant />
    </div>
  </div>
)

export default MemberPage
