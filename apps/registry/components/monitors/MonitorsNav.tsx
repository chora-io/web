'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './MonitorsNav.module.css'

const MonitorsNav = () => {
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <Link href={`/${network}/monitors/add`}>{'add monitor'}</Link>
    </div>
  )
}

export default MonitorsNav
