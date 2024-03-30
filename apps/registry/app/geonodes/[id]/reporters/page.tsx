import { Metadata } from 'next'

import Reporters from '@components/geonodes/Reporters'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const ReportersPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'geonode reporters'}</h1>
      <Reporters />
    </div>
  </div>
)

export default ReportersPage
