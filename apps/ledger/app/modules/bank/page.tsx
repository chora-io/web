import { Metadata } from 'next'

import ModuleInfo from '@components/modules/bank/ModuleInfo'
import MsgMultiSend from '@components/modules/bank/MsgMultiSend'
import MsgSend from '@components/modules/bank/MsgSend'
import MsgSetSendEnabled from '@components/modules/bank/MsgSetSendEnabled'
import QueryAllBalances from '@components/modules/bank/QueryAllBalances'
import QueryBalance from '@components/modules/bank/QueryBalance'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const BankPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'bank module'}</h1>
      <ModuleInfo />
      <MsgMultiSend />
      <MsgSend />
      <MsgSetSendEnabled />
      <QueryAllBalances />
      <QueryBalance />
    </div>
  </div>
)

export default BankPage
