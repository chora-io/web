'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import styles from './AccountsNav.module.css'

const AccountsNav = () => {
  const { groupId } = useParams()
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <Link href={`/${network}/${groupId}/accounts/create`}>
        {'create account'}
      </Link>
    </div>
  )
}

export default AccountsNav
