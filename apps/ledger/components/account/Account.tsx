'use client'

import { WalletContext } from 'chora/contexts'
import { useContext } from 'react'

import styles from './Account.module.css'

const Account = () => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <h2>{'account'}</h2>
      <p>{wallet?.name}</p>
      <p>{wallet?.bech32Address}</p>
    </div>
  )
}

export default Account
