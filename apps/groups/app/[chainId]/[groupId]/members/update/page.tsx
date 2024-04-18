import { Metadata } from 'next'

import LeaveGroup from '@components/groups/members/LeaveGroup'
import UpdateMembers from '@components/groups/members/UpdateMembers'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const UpdatePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'leave group'}</h1>
      <LeaveGroup />
      <h1>{'update members'}</h1>
      <UpdateMembers />
    </div>
  </div>
)

export default UpdatePage
