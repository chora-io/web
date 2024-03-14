import { Metadata } from 'next'

import Geonode from '@components/geonodes/Geonode'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const GeonodePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'geospatial node'}</h1>
      <Geonode />
    </div>
  </div>
)

export default GeonodePage
