import { Metadata } from 'next'

import ModuleInfo from '@components/modules/authz/ModuleInfo'
import MsgExec from '@components/modules/authz/MsgExec'
import MsgGrant from '@components/modules/authz/MsgGrant'
import MsgRevoke from '@components/modules/authz/MsgRevoke'
import QueryGranteeGrants from '@components/modules/authz/QueryGranteeGrants'
import QueryGranterGrants from '@components/modules/authz/QueryGranterGrants'
import QueryGrants from '@components/modules/authz/QueryGrants'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
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
