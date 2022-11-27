import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "../context/WalletContext"
import SelectNetwork from "./SelectNetwork"

import * as styles from "./ConnectWallet.module.css"

const connectedKey = "chora-header-connected"
const addressKey = "chora-header-address"
const networkKey = "chora-header-network"

const ConnectWallet = () => {

  // @ts-ignore
  const { getKeplr, network, chainInfo, wallet, error } = useContext(WalletContext)

  let connected: boolean, address: string, selected: string

  if (wallet == null) {
    connected = (localStorage.getItem(connectedKey) === "true")
    address = localStorage.getItem(addressKey) || ""
    selected = localStorage.getItem(networkKey) || network
  } else {
    connected = (network == chainInfo?.chainId)
    address = wallet.bech32Address
    selected = network
    localStorage.setItem(connectedKey, (connected ? "true" : "false"))
    localStorage.setItem(addressKey, address)
    localStorage.setItem(networkKey, network)
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
