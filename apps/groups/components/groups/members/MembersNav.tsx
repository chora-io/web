'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import styles from './MembersNav.module.css'

const MembersNav = () => {
  const { groupId } = useParams()
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <Link href={`/${network}/${groupId}/members/update`}>
        {'update members'}
      </Link>
    </div>
  )
}

export default MembersNav
