import { Metadata } from 'next'

import Account from '@components/workspace/Account'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const WorkspacePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'workspace dashboard'}</h1>
      <Account />
    </div>
  </div>
)

export default WorkspacePage
