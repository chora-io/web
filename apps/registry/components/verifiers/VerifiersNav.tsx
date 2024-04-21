'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './VerifiersNav.module.css'

const VerifiersNav = () => {
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <Link href={`/${network}/verifiers/add`}>{'add verifiers'}</Link>
    </div>
  )
}

export default VerifiersNav
