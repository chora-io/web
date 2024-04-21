import { Metadata } from 'next'

import AddVerifier from '@components/verifiers/AddVerifier'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const AddPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'add verifiers'}</h1>
      <AddVerifier />
    </div>
  </div>
)

export default AddPage
