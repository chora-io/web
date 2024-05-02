import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import AddSubject from '@components/subjects/AddSubject'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const AddPage = () => (
  <div className={styles.page}>
    <Breadcrumb text="subjects" />
    <h1>{'add subject'}</h1>
    <AddSubject />
  </div>
)

export default AddPage
