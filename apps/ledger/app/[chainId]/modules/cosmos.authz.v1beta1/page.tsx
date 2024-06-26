import { Metadata } from 'next'

import ModuleInfo from '@components/modules/cosmos.authz.v1beta1/ModuleInfo'
import MsgExec from '@components/modules/cosmos.authz.v1beta1/MsgExec'
import MsgGrant from '@components/modules/cosmos.authz.v1beta1/MsgGrant'
import MsgRevoke from '@components/modules/cosmos.authz.v1beta1/MsgRevoke'
import QueryGranteeGrants from '@components/modules/cosmos.authz.v1beta1/QueryGranteeGrants'
import QueryGranterGrants from '@components/modules/cosmos.authz.v1beta1/QueryGranterGrants'
import QueryGrants from '@components/modules/cosmos.authz.v1beta1/QueryGrants'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const ModulePage = () => (
  <div className={styles.page}>
    <h1>{'cosmos.authz.v1beta1'}</h1>
    <ModuleInfo />
    <MsgExec />
    <MsgGrant />
    <MsgRevoke />
    <QueryGranteeGrants />
    <QueryGranterGrants />
    <QueryGrants />
  </div>
)

export default ModulePage
