import { Metadata } from 'next'

import Groups from '@components/groups/Groups'
import GroupsNav from '@components/groups/GroupsNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const GroupsPage = () => (
  <div className={styles.page}>
    <h1>{'explore groups'}</h1>
    <GroupsNav />
    <Groups />
  </div>
)

export default GroupsPage
