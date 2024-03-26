import { Metadata } from 'next'

import LeaveGroup from '@components/groups/members/LeaveGroup'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const LeavePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'leave group'}</h1>
      <LeaveGroup />
    </div>
  </div>
)

export default LeavePage
