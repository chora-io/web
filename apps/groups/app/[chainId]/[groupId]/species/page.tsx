import { Metadata } from 'next'

import AllSpecies from '@components/groups/species/AllSpecies'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const SpeciesPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group species'}</h1>
      <AllSpecies />
    </div>
  </div>
)

export default SpeciesPage
