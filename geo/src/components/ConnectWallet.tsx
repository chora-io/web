import * as React from "react"
import { useContext } from "react"

import {
  cachedAddressKey,
  cachedConnectedKey,
  cachedNetworkKey,
  WalletContext,
} from "../contexts/WalletContext"

import SelectNetwork from "./SelectNetwork"

import * as styles from "./ConnectWallet.module.css"

const ConnectWallet = () => {

  // @ts-ignore
  const { getKeplr, network, chainInfo, wallet, error } = useContext(WalletContext)

  let address: string, connected: boolean, selected: string

  if (typeof localStorage !== "undefined") {
    if (wallet == null) {
      address = localStorage.getItem(cachedAddressKey) || ""
      connected = (localStorage.getItem(cachedConnectedKey) === "true")
      selected = localStorage.getItem(cachedNetworkKey) || network
    } else {
      address = wallet.bech32Address
      connected = (network == chainInfo?.chainId)
      selected = network
      localStorage.setItem(cachedAddressKey, address)
      localStorage.setItem(cachedConnectedKey, (connected ? "true" : "false"))
      localStorage.setItem(cachedNetworkKey, network)
    }
  } else {
    address = wallet?.bech32Address
    connected = (network == chainInfo?.chainId)
    selected = network
  }

  return (
    <div className={styles.connect}>
      <span className={styles.error}>
        {error}
      </span>
      {connected &&
        <span className={styles.address}>
          {address.substring(0, 9) + "..." + address.substring(41, 44)}
        </span>
      }
      <form className={styles.form} onSubmit={getKeplr}>
        <SelectNetwork
            value={selected}
            withLabel={false}
        />
        <button type="submit" className={connected ? styles.connected : null}>
          {connected ?
            <span>{"wallet connected"}</span>
          :
            <span>{"connect wallet"}</span>
          }
        </button>
      </form>
    </div>
  )
}

export default ConnectWallet
