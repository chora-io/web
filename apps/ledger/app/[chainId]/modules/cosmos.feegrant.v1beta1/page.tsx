import { Metadata } from 'next'

import ModuleInfo from '@components/modules/cosmos.feegrant.v1beta1/ModuleInfo'
import MsgGrantAllowance from '@components/modules/cosmos.feegrant.v1beta1/MsgGrantAllowance'
import MsgRevokeAllowance from '@components/modules/cosmos.feegrant.v1beta1/MsgRevokeAllowance'
import QueryAllowance from '@components/modules/cosmos.feegrant.v1beta1/QueryAllowance'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const ModulePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'cosmos.feegrant.v1beta1'}</h1>
      <ModuleInfo />
      <MsgGrantAllowance />
      <MsgRevokeAllowance />
      <QueryAllowance />
    </div>
  </div>
)

export default ModulePage
