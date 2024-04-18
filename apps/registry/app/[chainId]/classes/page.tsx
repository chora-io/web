import { Metadata } from 'next'

import Classes from '@components/classes/Classes'
import ClassesNav from '@components/classes/ClassesNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const ClassesPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'explore credit classes'}</h1>
      <ClassesNav />
      <Classes />
    </div>
  </div>
)

export default ClassesPage
