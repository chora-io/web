import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "../contexts"

import {
  cachedAddressKey,
  cachedConnectedKey,
  cachedNetworkKey,
  defaultNetwork,
} from "../contexts/WalletContext"

import SelectNetwork from "./SelectNetwork"

import styles from "./ConnectWallet.module.css"

const ConnectWallet = () => {

  const { getKeplr, network, setNetwork, wallet, loading, error } = useContext(WalletContext)

  // TODO: reconsider loading and whether the following should be within the context

  let address: string
  let connected: boolean
  let selected: string

  if (typeof localStorage !== "undefined") {

    // loading wallet from cache
    if (loading === true) {

      address = localStorage.getItem(cachedAddressKey) || ""
      connected = localStorage.getItem(cachedConnectedKey) === "true"
      selected = localStorage.getItem(cachedNetworkKey) || defaultNetwork

    // loading complete and wallet unavailable
    } else if (wallet === undefined) {

      address = ""
      connected = false
      selected = network || defaultNetwork

      localStorage.setItem(cachedAddressKey, "")
      localStorage.setItem(cachedConnectedKey, "false")
      localStorage.setItem(cachedNetworkKey, selected)

    // loading complete and wallet available
    } else {

      address = wallet.bech32Address
      connected = true
      selected = network || defaultNetwork

      localStorage.setItem(cachedAddressKey, address)
      localStorage.setItem(cachedConnectedKey, "true")
      localStorage.setItem(cachedNetworkKey, selected)

    }

  // local storage unavailable
  } else {
    address = wallet ? wallet.bech32Address : ""
    connected = wallet ? true : false
    selected = network || defaultNetwork
  }

  return (
    <div className={styles.connect}>
      {error &&
        <span className={styles.error}>
          {error}
        </span>
      }
      {address !== "" &&
        <span className={styles.address}>
          {address.substring(0, 13) + "..." + address.substring(38, 44)}
        </span>
      }
      <form className={styles.form} onSubmit={getKeplr}>
        <SelectNetwork
          label=" "
          network={network}
          setNetwork={setNetwork}
          selected={selected}
        />
        <button type="submit" className={connected ? styles.connected : undefined}>
          {connected ?
            <span>{"connected"}</span>
          :
            <span>{"connect"}</span>
          }
        </button>
      </form>
    </div>
  )
}

export default ConnectWallet
