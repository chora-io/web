import { Metadata } from 'next'

import ModuleInfo from '@components/modules/chora.geonode.v1/ModuleInfo'
import MsgCreate from '@components/modules/chora.geonode.v1/MsgCreate'
import MsgUpdateCurator from '@components/modules/chora.geonode.v1/MsgUpdateCurator'
import MsgUpdateMetadata from '@components/modules/chora.geonode.v1/MsgUpdateMetadata'
import QueryNode from '@components/modules/chora.geonode.v1/QueryNode'
import QueryNodes from '@components/modules/chora.geonode.v1/QueryNodes'
import QueryNodesByCurator from '@components/modules/chora.geonode.v1/QueryNodesByCurator'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const ModulePage = () => (
  <div className={styles.page}>
    <h1>{'chora.geonode.v1'}</h1>
    <ModuleInfo />
    <MsgCreate />
    <MsgUpdateCurator />
    <MsgUpdateMetadata />
    <QueryNode />
    <QueryNodes />
    <QueryNodesByCurator />
  </div>
)

export default ModulePage
