'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './ResolversNav.module.css'

const ResolversNav = () => {
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <Link href={`/${network}/resolvers/define`}>{'define resolver'}</Link>
    </div>
  )
}

export default ResolversNav
