'use client'

// import { Metadata } from 'next'

import Members from '@components/members/Members'
import MembersNav from '@components/members/MembersNav'

import styles from './page.module.css'

// export const metadata: Metadata = {
//   title: 'members',
// }

const MembersPage = () => {
  return (
    <div className={styles.page}>
      <div>
        <h1>{'group members'}</h1>
        <MembersNav />
        <Members />
      </div>
    </div>
  )
}

export default MembersPage
