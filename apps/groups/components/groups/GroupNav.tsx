'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import styles from './GroupNav.module.css'

const GroupNav = () => {
  const { groupId } = useParams()

  const { network } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <Link href={`/${network}/${groupId}/update`}>{'update group'}</Link>
    </div>
  )
}

export default GroupNav
