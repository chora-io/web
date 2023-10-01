import { Metadata } from 'next'

import ModuleInfo from '@components/authz/ModuleInfo'
import MsgExec from '@components/authz/MsgExec'
import MsgGrant from '@components/authz/MsgGrant'
import MsgRevoke from '@components/authz/MsgRevoke'
import QueryGranteeGrants from '@components/authz/QueryGranteeGrants'
import QueryGranterGrants from '@components/authz/QueryGranterGrants'
import QueryGrants from '@components/authz/QueryGrants'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'mods | authz',
}

const AuthzPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'authz module'}</h1>
      <ModuleInfo />
      <MsgExec />
      <MsgGrant />
      <MsgRevoke />
      <QueryGranteeGrants />
      <QueryGranterGrants />
      <QueryGrants />
    </div>
  </div>
)

export default AuthzPage
