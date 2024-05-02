import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import CreateBatch from '@components/batches/CreateBatch'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const CreatePage = () => (
  <div className={styles.page}>
    <Breadcrumb text="batches" />
    <h1>{'create credit batch'}</h1>
    <CreateBatch />
  </div>
)

export default CreatePage
