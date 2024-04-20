'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './SpeciesNav.module.css'

const SpeciesNav = () => {
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <Link href={`/${network}/species/add`}>{'add species'}</Link>
    </div>
  )
}

export default SpeciesNav
