'use client'

import Link from 'next/link'

import styles from './ClassesNav.module.css'

const ClassesNav = () => {
  return (
    <div className={styles.box}>
      <Link href={`/classes/create`}>{'create class'}</Link>
    </div>
  )
}

export default ClassesNav
