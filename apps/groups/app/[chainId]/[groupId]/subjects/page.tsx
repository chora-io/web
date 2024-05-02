import { Metadata } from 'next'

import Subjects from '@components/groups/subjects/Subjects'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const SubjectsPage = () => (
  <div className={styles.page}>
    <h1>{'group subjects'}</h1>
    <Subjects />
  </div>
)

export default SubjectsPage
