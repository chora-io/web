import { Metadata } from 'next'

import ModuleInfo from '@components/modules/regen.intertx.v1/ModuleInfo'
import MsgRegisterAccount from '@components/modules/regen.intertx.v1/MsgRegisterAccount'
import MsgSubmitTx from '@components/modules/regen.intertx.v1/MsgSubmitTx'
import QueryInterchainAccount from '@components/modules/regen.intertx.v1/QueryInterchainAccount'

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
