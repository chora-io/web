'use client'

import Link from 'next/link'

import styles from './BasketsNav.module.css'

const BasketsNav = () => {
  return (
    <div className={styles.box}>
      <Link href={`/baskets/create`}>{'create basket'}</Link>
    </div>
  )
}

export default BasketsNav
