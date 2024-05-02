import { Metadata } from 'next'

import Subjects from '@components/subjects/Subjects'
import SubjectsNav from '@components/subjects/SubjectsNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const SubjectsPage = () => (
  <div className={styles.page}>
    <h1>{'explore subjects'}</h1>
    <SubjectsNav />
    <Subjects />
  </div>
)

export default SubjectsPage
