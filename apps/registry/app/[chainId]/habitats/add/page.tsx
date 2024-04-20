import { Metadata } from 'next'

import AddHabitat from '@components/habitats/AddHabitat'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const AddPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'add habitat'}</h1>
      <AddHabitat />
    </div>
  </div>
)

export default AddPage
