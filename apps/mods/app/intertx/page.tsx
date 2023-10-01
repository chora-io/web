import { Metadata } from 'next'

import ModuleInfo from '@components/intertx/ModuleInfo'
import MsgRegisterAccount from '@components/intertx/MsgRegisterAccount'
import MsgSubmitTx from '@components/intertx/MsgSubmitTx'
import QueryInterchainAccount from '@components/intertx/QueryInterchainAccount'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'mods | intertx',
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
