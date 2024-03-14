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
        <h3>
          <Link href={`/groups/${groupId}`}>{'Chora Cooperative'}</Link>
        </h3>
      </div>
    </div>
  )
}

export default Groups
