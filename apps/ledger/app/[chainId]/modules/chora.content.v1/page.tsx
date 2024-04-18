import { Metadata } from 'next'

import ModuleInfo from '@components/modules/chora.content.v1/ModuleInfo'
import MsgCreate from '@components/modules/chora.content.v1/MsgCreate'
import MsgDelete from '@components/modules/chora.content.v1/MsgDelete'
import MsgUpdateCurator from '@components/modules/chora.content.v1/MsgUpdateCurator'
import MsgUpdateMetadata from '@components/modules/chora.content.v1/MsgUpdateMetadata'
import QueryContent from '@components/modules/chora.content.v1/QueryContent'
import QueryContents from '@components/modules/chora.content.v1/QueryContents'
import QueryContentsByCurator from '@components/modules/chora.content.v1/QueryContentsByCurator'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const ModulePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'chora.content.v1'}</h1>
      <ModuleInfo />
      <MsgCreate />
      <MsgDelete />
      <MsgUpdateCurator />
      <MsgUpdateMetadata />
      <QueryContent />
      <QueryContents />
      <QueryContentsByCurator />
    </div>
  </div>
)

export default ModulePage
