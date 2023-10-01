import { Metadata } from 'next'

import ModuleInfo from '@components/feegrant/ModuleInfo'
import MsgGrantAllowance from '@components/feegrant/MsgGrantAllowance'
import MsgRevokeAllowance from '@components/feegrant/MsgRevokeAllowance'
import QueryAllowance from '@components/feegrant/QueryAllowance'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'mods | feegrant',
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
