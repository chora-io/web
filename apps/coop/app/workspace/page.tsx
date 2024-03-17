import { Metadata } from 'next'

import Overview from '@components/workspace/Overview'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const WorkspacePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'workspace overview'}</h1>
      <Overview />
    </div>
  </div>
)

export default WorkspacePage
