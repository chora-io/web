import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import Batch from '@components/groups/batches/Batch'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const BatchPage = () => (
  <div className={styles.page}>
    <div>
      <Breadcrumb text="batches" />
      <h1>{'group credit batch'}</h1>
      <Batch />
    </div>
  </div>
)

export default BatchPage
