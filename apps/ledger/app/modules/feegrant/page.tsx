import { Metadata } from 'next'

import ModuleInfo from '@components/modules/feegrant/ModuleInfo'
import MsgGrantAllowance from '@components/modules/feegrant/MsgGrantAllowance'
import MsgRevokeAllowance from '@components/modules/feegrant/MsgRevokeAllowance'
import QueryAllowance from '@components/modules/feegrant/QueryAllowance'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const FeegrantPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'feegrant module'}</h1>
      <ModuleInfo />
      <MsgGrantAllowance />
      <MsgRevokeAllowance />
      <QueryAllowance />
    </div>
  </div>
)

export default FeegrantPage
