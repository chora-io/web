'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import styles from './MembersNav.module.css'

const MembersNav = () => {
  const { groupId } = useParams()

  return (
    <div className={styles.box}>
      <Link href={`/groups/${groupId}/members/update`}>{'update members'}</Link>
    </div>
  )
}

export default MembersNav
