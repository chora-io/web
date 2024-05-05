'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext, useEffect, useState } from 'react'

import styles from './Account.module.css'

const Account = () => {
  const { loading, wallet } = useContext(WalletContext)

  const [hasMounted, setHasMounted] = useState<boolean>(false)
  const [walletError, setWalletError] = useState<string | null>(null)

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true)
    }
    if (!wallet && !loading && hasMounted) {
      setWalletError('keplr wallet not found')
    }
    if (wallet && hasMounted) {
      setWalletError(null)
    }
  }, [wallet, loading, hasMounted])

  return (
    <div className={styles.box}>
      {loading && <div className={styles.boxText}>{'loading...'}</div>}
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
        <Result error={walletError} />
      )}
    </div>
  )
}

export default Account
