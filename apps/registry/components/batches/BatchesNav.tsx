'use client'

import Link from 'next/link'

import styles from './BatchesNav.module.css'

const BatchesNav = () => {
  return (
    <div className={styles.box}>
      <Link href={`/batches/create`}>{'create batch'}</Link>
    </div>
  )
}

export default BatchesNav
