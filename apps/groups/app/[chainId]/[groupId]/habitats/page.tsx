import { Metadata } from 'next'

import Habitats from '@components/groups/habitats/Habitats'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const HabitatsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group habitats'}</h1>
      <Habitats />
    </div>
  </div>
)

export default HabitatsPage
