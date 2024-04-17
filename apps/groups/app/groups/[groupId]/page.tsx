import { Metadata } from 'next'

import Group from '@components/groups/Group'
import GroupNav from '@components/groups/GroupNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const GroupPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group overview'}</h1>
      <GroupNav />
      <Group />
    </div>
  </div>
)

export default GroupPage
