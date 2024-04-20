'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './LocalesNav.module.css'

const LocalesNav = () => {
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <Link href={`/${network}/locales/add`}>{'add locale'}</Link>
    </div>
  )
}

export default LocalesNav
