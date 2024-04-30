'use client'

import * as React from 'react'
import { useContext, useEffect, useState } from 'react'

import { WalletContext } from '../contexts'
import { SelectNetwork } from './forms'

import styles from './ConnectWallet.module.css'

const ConnectWallet = ({ testnetsOnly }: any) => {
  const { getKeplr, network, setNetwork, wallet, error } =
    useContext(WalletContext)

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted ? (
    <div className={styles.connect}>
      {error && <span className={styles.error}>{error}</span>}
      {wallet?.bech32Address.length > 0 && (
        <span className={styles.address}>
          {wallet.bech32Address.substring(0, 13) +
            '...' +
            wallet.bech32Address.substring(38, 44)}
        </span>
      )}
      <form className={styles.form} onSubmit={getKeplr}>
        <SelectNetwork
          label=" "
          network={network}
          setNetwork={setNetwork}
          testnetsOnly={testnetsOnly}
        />
        <button type="submit" className={wallet ? styles.connected : undefined}>
          {wallet ? <span>{'connected'}</span> : <span>{'connect'}</span>}
        </button>
      </form>
    </div>
  ) : (
    <></>
  )
}

export default ConnectWallet
