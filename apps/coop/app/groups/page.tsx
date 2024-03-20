import { Metadata } from 'next'

import Groups from '@components/groups/Groups'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const GroupsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'groups'}</h1>
      <Groups />
    </div>
  </div>
)

export default GroupsPage
