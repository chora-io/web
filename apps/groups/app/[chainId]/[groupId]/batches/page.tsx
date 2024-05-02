import { Metadata } from 'next'

import Batches from '@components/groups/batches/Batches'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const BatchesPage = () => (
  <div className={styles.page}>
    <h1>{'group credit batches'}</h1>
    <Batches />
  </div>
)

export default BatchesPage
