import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "../context/WalletContext"
import SelectNetwork from "./SelectNetwork"

import * as styles from "./ConnectWallet.module.css"

const ConnectWallet = () => {

  // @ts-ignore
  const { getKeplr, keplr, wallet, error, result } = useContext(WalletContext)

  return (
    <div>
      <form className={styles.form} onSubmit={getKeplr}>
        <SelectNetwork />
        <button type="submit">
          {keplr == null ?
            <span>{"connect wallet"}</span>
          :
            <span>{"wallet connected"}</span>
          }
        </button>
      </form>
      {error != "" &&
        <div className={styles.error}>
          {error}
        </div>
      }
      {wallet != null &&
        <div className={styles.result}>
          {wallet.bech32Address.substring(0, 10) + "..." + wallet.bech32Address.substring(38, 44)}
        </div>
      }
      {result != "" &&
        <div className={styles.result}>
          {result}
        </div>
      }
    </div>
  )
}

export default ConnectWallet
