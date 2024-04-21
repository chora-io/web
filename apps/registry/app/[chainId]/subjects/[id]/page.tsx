import { Metadata } from 'next'

import Subject from '@components/subjects/Subject'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const SubjectPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'subject'}</h1>
      <Subject />
    </div>
  </div>
)

export default SubjectPage
