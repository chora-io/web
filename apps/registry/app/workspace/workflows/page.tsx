import { Metadata } from 'next'

import Workflows from '@components/workspace/workflows/Workflows'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const WorkflowsPage = () => (
  <div className={styles.page}>
    <h1>{'manage workflows'}</h1>
    <Workflows />
  </div>
)

export default WorkflowsPage
