'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './ClassesNav.module.css'

const ClassesNav = () => {
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <Link href={`/${network}/classes/create`}>{'create class'}</Link>
    </div>
  )
}

export default ClassesNav
