'use client'

import { WalletContext } from 'chora/contexts'
import { useNetworkCoop } from 'chora/hooks'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './Groups.module.css'

const Groups = () => {
  const { chainInfo } = useContext(WalletContext)

  const [groupId] = useNetworkCoop(chainInfo)

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <p>
          <Link href={`/groups/${groupId}`}>{'Chora Cooperative'}</Link>
        </p>
      </div>
    </div>
  )
}

export default Groups
