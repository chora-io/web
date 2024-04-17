'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import styles from './ProposalsNav.module.css'

const ProposalsNav = () => {
  const { groupId } = useParams()

  return (
    <div className={styles.box}>
      <Link href={`/groups/${groupId}/proposals/submit`}>
        {'submit proposal'}
      </Link>
    </div>
  )
}

export default ProposalsNav
