import { Metadata } from 'next'

import Dashboard from '@components/workspace/Dashboard'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const WorkspacePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'workspace dashboard'}</h1>
      <Dashboard />
    </div>
  </div>
)

export default WorkspacePage
