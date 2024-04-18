'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './BasketsNav.module.css'

const BasketsNav = () => {
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <Link href={`/${network}/baskets/create`}>{'create basket'}</Link>
    </div>
  )
}

export default BasketsNav
