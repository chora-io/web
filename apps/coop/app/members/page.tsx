import { Metadata } from 'next'

import Members from '@components/members/Members'
import MembersNav from '@components/members/MembersNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'coop | members',
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
