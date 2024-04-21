import { Metadata } from 'next'

import AddResolver from '@components/resolvers/AddResolver'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const AddPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'add resolver'}</h1>
      <AddResolver />
    </div>
  </div>
)

export default AddPage