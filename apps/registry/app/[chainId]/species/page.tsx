import { Metadata } from 'next'

import AllSpecies from '@components/species/AllSpecies'
import SpeciesNav from '@components/species/SpeciesNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const SpeciesPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'explore species'}</h1>
      <SpeciesNav />
      <AllSpecies />
    </div>
  </div>
)

export default SpeciesPage
