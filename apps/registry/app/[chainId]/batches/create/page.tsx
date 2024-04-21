import { Metadata } from 'next'

import CreateBatch from '@components/batches/CreateBatch'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const CreatePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'create credit batch'}</h1>
      <CreateBatch />
    </div>
  </div>
)

export default CreatePage