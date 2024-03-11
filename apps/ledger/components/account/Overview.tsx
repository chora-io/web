'use client'

import { WalletContext } from 'chora/contexts'
import { useContext } from 'react'

import styles from './Overview.module.css'

const Overview = () => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <p>{wallet?.name}</p>
      <p>{wallet?.bech32Address}</p>
    </div>
  )
}

export default Overview
