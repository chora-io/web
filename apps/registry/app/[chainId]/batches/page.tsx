import { Metadata } from 'next'

import Batches from '@components/batches/Batches'
import BatchesNav from '@components/batches/BatchesNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const BatchesPage = () => (
  <div className={styles.page}>
    <h1>{'explore credit batches'}</h1>
    <BatchesNav />
    <Batches />
  </div>
)

export default BatchesPage
