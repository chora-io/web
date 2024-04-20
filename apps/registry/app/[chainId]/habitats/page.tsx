import { Metadata } from 'next'

import Habitats from '@components/habitats/Habitats'
import HabitatsNav from '@components/habitats/HabitatsNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const HabitatsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'explore habitats'}</h1>
      <HabitatsNav />
      <Habitats />
    </div>
  </div>
)

export default HabitatsPage
