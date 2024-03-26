import { Metadata } from 'next'

import Geonodes from '@components/groups/geonodes/Geonodes'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const GeonodesPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group geonodes'}</h1>
      <Geonodes />
    </div>
  </div>
)

export default GeonodesPage
