import { Metadata } from 'next'

import Geonodes from '@components/geonodes/Geonodes'
import GeonodesNav from '@components/geonodes/GeonodesNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const GeonodesPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'explore geonodes'}</h1>
      <GeonodesNav />
      <Geonodes />
    </div>
  </div>
)

export default GeonodesPage
