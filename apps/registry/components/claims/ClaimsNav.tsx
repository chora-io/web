'use client'

import Link from 'next/link'

import styles from './ClaimsNav.module.css'

const ClaimsNav = () => {
  return (
    <div className={styles.box}>
      <Link href={`/claims/create`}>{'create claim'}</Link>
    </div>
  )
}

export default ClaimsNav
