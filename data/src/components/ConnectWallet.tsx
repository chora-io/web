import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "../context/wallet"

import * as styles from "./ConnectWallet.module.css"

import {
  choraLocal,
  choraTestnet,
  regenLocal,
  regenRedwood,
  regenHambach,
} from "../utils/chains"

const ConnectWallet = () => {

  // @ts-ignore
  const { getKeplr, network, setNetwork, response, keplr, wallet, error } = useContext(WalletContext)

  return (
    <div>
      <form className={styles.form} onSubmit={getKeplr}>
        <label htmlFor="network">
          {"network"}
          <select
            id="network"
            value={network}
            onChange={event => setNetwork(event.target.value)}
          >
            <option value={choraLocal.chainId}>
              {choraLocal.chainId}
            </option>
            <option value={choraTestnet.chainId}>
              {choraTestnet.chainId}
            </option>
            <option value={regenLocal.chainId}>
              {regenLocal.chainId}
            </option>
            <option value={regenRedwood.chainId}>
              {regenRedwood.chainId}
            </option>
            <option value={regenHambach.chainId}>
              {regenHambach.chainId}
            </option>
          </select>
        </label>
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
        <div className={styles.response}>
          {wallet.bech32Address.substring(0, 10) + "..." + wallet.bech32Address.substring(38, 44)}
        </div>
      }
      {response != "" &&
        <div className={styles.response}>
          {response}
        </div>
      }
    </div>
  )
}

export default ConnectWallet
