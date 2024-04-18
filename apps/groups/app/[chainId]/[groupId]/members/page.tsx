import { Metadata } from 'next'

import Members from '@components/groups/members/Members'
import MembersNav from '@components/groups/members/MembersNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const MembersPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group members'}</h1>
      <MembersNav />
      <Members />
    </div>
  </div>
)

export default MembersPage
