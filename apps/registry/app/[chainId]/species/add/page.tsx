import { Metadata } from 'next'

import AddSpecies from '@components/species/AddSpecies'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const AddPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'add species'}</h1>
      <AddSpecies />
    </div>
  </div>
)

export default AddPage
