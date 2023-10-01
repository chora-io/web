import { Metadata } from 'next'

import ModuleInfo from '@components/bank/ModuleInfo'
import MsgMultiSend from '@components/bank/MsgMultiSend'
import MsgSend from '@components/bank/MsgSend'
import MsgSetSendEnabled from '@components/bank/MsgSetSendEnabled'
import QueryAllBalances from '@components/bank/QueryAllBalances'
import QueryBalance from '@components/bank/QueryBalance'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'mods | bank',
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
