'use client'

import { WalletContext } from 'chora/contexts'
import { useContext } from 'react'

import styles from './Overview.module.css'

const Overview = () => {
  const { chainInfo } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <p>{chainInfo?.chainName}</p>
    </div>
  )
}

export default Overview
