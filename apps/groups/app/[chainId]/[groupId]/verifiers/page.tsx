import { Metadata } from 'next'

import Verifiers from '@components/groups/verifiers/Verifiers'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const VerifiersPage = () => (
  <div className={styles.page}>
    <h1>{'group verifiers'}</h1>
    <Verifiers />
  </div>
)

export default VerifiersPage
