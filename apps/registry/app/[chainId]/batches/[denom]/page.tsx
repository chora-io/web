import { Metadata } from 'next'

import Batch from '@components/batches/Batch'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const BatchPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'credit batch'}</h1>
      <Batch />
    </div>
  </div>
)

export default BatchPage
