import { Metadata } from 'next'

import Geonode from '@components/geonodes/Geonode'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
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
