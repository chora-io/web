import { Metadata } from 'next'

import ModuleInfo from '@components/modules/cosmos.bank.v1beta1/ModuleInfo'
import MsgMultiSend from '@components/modules/cosmos.bank.v1beta1/MsgMultiSend'
import MsgSend from '@components/modules/cosmos.bank.v1beta1/MsgSend'
import MsgSetSendEnabled from '@components/modules/cosmos.bank.v1beta1/MsgSetSendEnabled'
import QueryAllBalances from '@components/modules/cosmos.bank.v1beta1/QueryAllBalances'
import QueryBalance from '@components/modules/cosmos.bank.v1beta1/QueryBalance'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const ModulePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'cosmos.bank.v1beta1'}</h1>
      <ModuleInfo />
      <MsgMultiSend />
      <MsgSend />
      <MsgSetSendEnabled />
      <QueryAllBalances />
      <QueryBalance />
    </div>
  </div>
)

export default ModulePage
