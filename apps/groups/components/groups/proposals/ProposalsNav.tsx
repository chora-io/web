'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import styles from './ProposalsNav.module.css'

const ProposalsNav = () => {
  const { groupId } = useParams()
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <Link href={`/${network}/${groupId}/proposals/submit`}>
        {'submit proposal'}
      </Link>
    </div>
  )
}

export default ProposalsNav
