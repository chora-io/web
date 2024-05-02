import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import Subject from '@components/groups/subjects/Subject'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const SubjectPage = () => (
  <div className={styles.page}>
    <Breadcrumb text="subjects" />
    <h1>{'group subject'}</h1>
    <Subject />
  </div>
)

export default SubjectPage
