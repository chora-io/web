import { Metadata } from 'next'

import ModuleInfo from '@components/modules/intertx/ModuleInfo'
import MsgRegisterAccount from '@components/modules/intertx/MsgRegisterAccount'
import MsgSubmitTx from '@components/modules/intertx/MsgSubmitTx'
import QueryInterchainAccount from '@components/modules/intertx/QueryInterchainAccount'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const InterTxPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'intertx module'}</h1>
      <ModuleInfo />
      <MsgRegisterAccount />
      <MsgSubmitTx />
      <QueryInterchainAccount />
    </div>
  </div>
)

export default InterTxPage
