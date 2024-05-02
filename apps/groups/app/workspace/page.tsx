import { Metadata } from 'next'

import Dashboard from '@components/workspace/Dashboard'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const WorkspacePage = () => (
  <div className={styles.page}>
    <h1>{'workspace dashboard'}</h1>
    <Dashboard />
  </div>
)

export default WorkspacePage
