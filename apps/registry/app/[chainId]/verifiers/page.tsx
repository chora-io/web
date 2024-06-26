import { Metadata } from 'next'

import Verifiers from '@components/verifiers/Verifiers'
import VerifiersNav from '@components/verifiers/VerifiersNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const VerifiersPage = () => (
  <div className={styles.page}>
    <h1>{'explore verifiers'}</h1>
    <VerifiersNav />
    <Verifiers />
  </div>
)

export default VerifiersPage
