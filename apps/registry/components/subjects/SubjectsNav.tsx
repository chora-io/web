'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './SubjectsNav.module.css'

const SubjectsNav = () => {
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <Link href={`/${network}/subjects/add`}>{'add subject'}</Link>
    </div>
  )
}

export default SubjectsNav
