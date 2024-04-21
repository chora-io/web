import { Metadata } from 'next'

import Verifiers from '@components/verifiers/Verifiers'
import VerifiersNav from '@components/verifiers/VerifiersNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const VerifierPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'explore verifiers'}</h1>
      <VerifiersNav />
      <Verifiers />
    </div>
  </div>
)

export default VerifierPage
