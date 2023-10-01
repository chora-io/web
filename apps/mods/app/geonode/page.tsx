import { Metadata } from 'next'

import ModuleInfo from '@components/geonode/ModuleInfo'
import MsgCreate from '@components/geonode/MsgCreate'
import MsgUpdateCurator from '@components/geonode/MsgUpdateCurator'
import MsgUpdateMetadata from '@components/geonode/MsgUpdateMetadata'
import QueryNode from '@components/geonode/QueryNode'
import QueryNodes from '@components/geonode/QueryNodes'
import QueryNodesByCurator from '@components/geonode/QueryNodesByCurator'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'mods | geonode',
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
