'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './HabitatsNav.module.css'

const HabitatsNav = () => {
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <Link href={`/${network}/habitats/add`}>{'add habitat'}</Link>
    </div>
  )
}

export default HabitatsNav
