'use client'

import * as React from 'react'
import { useContext, useEffect, useState } from 'react'

import {
  WalletContext,
  cachedAddressKey,
  cachedConnectedKey,
  cachedNetworkKey,
  defaultNetwork,
} from '../contexts/WalletContext'
import SelectNetwork from './SelectNetwork'

import styles from './ConnectWallet.module.css'

const ConnectWallet = ({ testnets }: any) => {
  const { getKeplr, network, setNetwork, wallet, loading, error } =
    useContext(WalletContext)

  // TODO: reconsider loading and whether the following should be within the context

  const [address, setAddress] = useState<string>('')
  const [connected, setConnected] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>('')

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      // loading wallet from cache
      if (loading === true) {
        setAddress(localStorage.getItem(cachedAddressKey) || '')
        setConnected(localStorage.getItem(cachedConnectedKey) === 'true')
        setSelected(localStorage.getItem(cachedNetworkKey) || defaultNetwork)

        // loading complete and wallet unavailable
      } else if (!wallet) {
        setAddress('')
        setConnected(false)
        setSelected(network || defaultNetwork)

        localStorage.setItem(cachedAddressKey, '')
        localStorage.setItem(cachedConnectedKey, 'false')
        localStorage.setItem(cachedNetworkKey, network || defaultNetwork)

        // loading complete and wallet available
      } else {
        setAddress(wallet.bech32Address)
        setConnected(true)
        setSelected(network || defaultNetwork)

        localStorage.setItem(cachedAddressKey, wallet.bech32Address)
        localStorage.setItem(cachedConnectedKey, 'true')
        localStorage.setItem(cachedNetworkKey, network || defaultNetwork)
      }
    }
  }, [network, wallet, loading])

  return (
    <div className={styles.connect}>
      {error && <span className={styles.error}>{error}</span>}
      {address.length > 0 && (
        <span className={styles.address}>
          {address.substring(0, 13) + '...' + address.substring(38, 44)}
        </span>
      )}
      <form className={styles.form} onSubmit={getKeplr}>
        <SelectNetwork
          label=" "
          network={network}
          selected={selected}
          setNetwork={setNetwork}
          testnets={testnets}
        />
        <button
          type="submit"
          className={connected ? styles.connected : undefined}
        >
          {connected ? <span>{'connected'}</span> : <span>{'connect'}</span>}
        </button>
      </form>
    </div>
  )
}

export default ConnectWallet
