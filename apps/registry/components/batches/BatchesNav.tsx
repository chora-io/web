'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './BatchesNav.module.css'

const BatchesNav = () => {
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <Link href={`/${network}/batches/create`}>{'create batch'}</Link>
    </div>
  )
}

export default BatchesNav
