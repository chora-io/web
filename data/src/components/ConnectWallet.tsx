import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "../context/WalletContext"
import SelectNetwork from "./SelectNetwork"

import * as styles from "./ConnectWallet.module.css"

const ConnectWallet = () => {

  // @ts-ignore
  const { getKeplr, keplr, wallet, error, success } = useContext(WalletContext)

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
        <div className={styles.success}>
          {wallet.bech32Address.substring(0, 10) + "..." + wallet.bech32Address.substring(38, 44)}
        </div>
      }
      {success != "" &&
        <div className={styles.success}>
          {success}
        </div>
      }
    </div>
  )
}

export default ConnectWallet
