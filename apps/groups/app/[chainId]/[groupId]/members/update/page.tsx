import { Breadcrumb } from 'chora/components'
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
      <Breadcrumb text="← members" />
      <h1>{'update members'}</h1>
      <UpdateMembers />
      <h1>{'leave group'}</h1>
      <LeaveGroup />
    </div>
  </div>
)

export default UpdatePage
