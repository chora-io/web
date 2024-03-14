import { Metadata } from 'next'

import Geonode from '@components/groups/geonodes/Geonode'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const GeonodePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'geonode'}</h1>
      <Geonode />
    </div>
  </div>
)

export default GeonodePage
