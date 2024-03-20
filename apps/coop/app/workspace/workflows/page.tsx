import { Metadata } from 'next'

import Workflows from '@components/workspace/workflows/Workflows'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const WorkflowsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'workflows'}</h1>
      <Workflows />
    </div>
  </div>
)

export default WorkflowsPage
