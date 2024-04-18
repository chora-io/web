'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './ClaimsNav.module.css'

const ClaimsNav = () => {
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <Link href={`/${network}/claims/create`}>{'create claim'}</Link>
    </div>
  )
}

export default ClaimsNav
