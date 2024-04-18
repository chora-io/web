'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './GroupsNav.module.css'

const GroupsNav = () => {
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <Link href={`/${network}/create`}>{'create group'}</Link>
    </div>
  )
}

export default GroupsNav
