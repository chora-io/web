import { Metadata } from 'next'

import UpdateMembers from '@components/groups/members/UpdateMembers'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const UpdatePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'update group members'}</h1>
      <UpdateMembers />
    </div>
  </div>
)

export default UpdatePage
