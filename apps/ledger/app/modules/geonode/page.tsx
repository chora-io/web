import { Metadata } from 'next'

import ModuleInfo from '@components/modules/geonode/ModuleInfo'
import MsgCreate from '@components/modules/geonode/MsgCreate'
import MsgUpdateCurator from '@components/modules/geonode/MsgUpdateCurator'
import MsgUpdateMetadata from '@components/modules/geonode/MsgUpdateMetadata'
import QueryNode from '@components/modules/geonode/QueryNode'
import QueryNodes from '@components/modules/geonode/QueryNodes'
import QueryNodesByCurator from '@components/modules/geonode/QueryNodesByCurator'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const GeonodePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'geonode module'}</h1>
      <ModuleInfo />
      <MsgCreate />
      <MsgUpdateCurator />
      <MsgUpdateMetadata />
      <QueryNode />
      <QueryNodes />
      <QueryNodesByCurator />
    </div>
  </div>
)

export default GeonodePage
