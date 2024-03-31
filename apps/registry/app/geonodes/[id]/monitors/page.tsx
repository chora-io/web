import { Metadata } from 'next'

import Monitors from '@components/geonodes/Monitors'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const MonitorsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'geonode monitors'}</h1>
      <Monitors />
    </div>
  </div>
)

export default MonitorsPage
