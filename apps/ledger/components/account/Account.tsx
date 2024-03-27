'use client'

import { WalletContext } from 'chora/contexts'
import { useContext } from 'react'

import styles from './Account.module.css'

const Account = () => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      {wallet ? (
        <>
          <div className={styles.boxText}>
            <h3>{'name'}</h3>
            <p>{wallet.name}</p>
          </div>
          <div className={styles.boxText}>
            <h3>{'address'}</h3>
            <p>{wallet.bech32Address}</p>
          </div>
        </>
      ) : (
        <div className={styles.boxText}>
          <p>{'keplr wallet not connected'}</p>
        </div>
      )}
    </div>
  )
}

export default Account
