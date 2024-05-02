import { Metadata } from 'next'

import ModuleInfo from '@components/modules/regen.intertx.v1/ModuleInfo'
import MsgRegisterAccount from '@components/modules/regen.intertx.v1/MsgRegisterAccount'
import MsgSubmitTx from '@components/modules/regen.intertx.v1/MsgSubmitTx'
import QueryInterchainAccount from '@components/modules/regen.intertx.v1/QueryInterchainAccount'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const ModulePage = () => (
  <div className={styles.page}>
    <h1>{'regen.intertx.v1'}</h1>
    <ModuleInfo />
    <MsgRegisterAccount />
    <MsgSubmitTx />
    <QueryInterchainAccount />
  </div>
)

export default ModulePage
