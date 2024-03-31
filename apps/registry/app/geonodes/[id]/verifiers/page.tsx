import { Metadata } from 'next'

import Verifiers from '@components/geonodes/Verifiers'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const VerifiersPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'geonode verifiers'}</h1>
      <Verifiers />
    </div>
  </div>
)

export default VerifiersPage
