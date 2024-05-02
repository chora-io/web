import { Metadata } from 'next'

import Documents from '@components/workspace/documents/Documents'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const DocumentsPage = () => (
  <div className={styles.page}>
    <h1>{'manage documents'}</h1>
    <Documents />
  </div>
)

export default DocumentsPage
