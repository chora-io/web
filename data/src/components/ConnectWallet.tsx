import * as React from "react"
import { useContext, useEffect } from "react"

import { WalletContext } from "../context/WalletContext"
import SelectNetwork from "./SelectNetwork"

import * as styles from "./ConnectWallet.module.css"

const ConnectWallet = () => {

  // @ts-ignore
  const { getKeplr, loadKeplr, keplr, wallet, error } = useContext(WalletContext)

  // reload wallet context
  useEffect(() => {
    if (wallet == undefined) {
      loadKeplr()
    }
  })

  return (
    <div className={styles.connect}>
      <span className={styles.error}>
        {error}
      </span>
      {wallet != null &&
        <span className={styles.address}>
          {wallet.bech32Address.substring(0, 9) + "..." + wallet.bech32Address.substring(41, 44)}
        </span>
      }
      <form className={styles.form} onSubmit={getKeplr}>
        <SelectNetwork withLabel={false} />
        <button type="submit">
          {keplr == null ?
            <span>{"connect wallet"}</span>
          :
            <span>{"wallet connected"}</span>
          }
        </button>
      </form>
    </div>
  )
}

export default ConnectWallet
