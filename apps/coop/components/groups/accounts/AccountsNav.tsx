'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import styles from './AccountsNav.module.css'

const AccountsNav = () => {
  const { groupId } = useParams()

  return (
    <div className={styles.box}>
      <Link href={`/groups/${groupId}/accounts/create`}>
        {'create account'}
      </Link>
    </div>
  )
}

export default AccountsNav
