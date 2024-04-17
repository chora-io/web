'use client'

import Link from 'next/link'

import styles from './GroupsNav.module.css'

const GroupsNav = () => {
  return (
    <div className={styles.box}>
      <Link href={`/groups/create`}>{'create group'}</Link>
    </div>
  )
}

export default GroupsNav
