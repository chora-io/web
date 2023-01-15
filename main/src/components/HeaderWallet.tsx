import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "chora"
import icon from "chora/assets/images/chora_dark_icon.png"
import ConnectWallet from "chora/components/ConnectWallet"

import * as styles from "./HeaderWallet.module.css"

const HeaderWallet = () => {

  let local = false
  if (typeof window !== "undefined" && (
      window.location.hostname == "0.0.0.0" ||
      window.location.hostname == "127.0.0.1" ||
      window.location.hostname == "localhost"
    )
  ) { local = true }

  return (
    <div className={styles.header}>
      <div className={styles.menu}>
        <ul>
          <li>
            <a href={local ? "http://" + window.location.hostname + ":8000" : "/"}>
              <div className={styles.title}>
                <img src={icon} />
                <div>
                  {"chora"}
                </div>
              </div>
            </a>
          </li>
        </ul>
        <ConnectWallet {...useContext(WalletContext)} />
      </div>
    </div>
  )
}

export default HeaderWallet
