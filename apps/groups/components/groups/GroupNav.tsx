'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import styles from './GroupNav.module.css'

const GroupNav = () => {
  const { groupId } = useParams()

  return (
    <div className={styles.box}>
      <Link href={`/groups/${groupId}/update`}>{'update group'}</Link>
    </div>
  )
}

export default GroupNav
