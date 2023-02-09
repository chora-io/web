import * as React from "react"
import { Link } from "gatsby"

import ConnectWallet from "./ConnectWallet"

import icon from "../assets/images/chora_dark_icon.png"

import * as styles from "./Header.module.css"

const Header = ({ context }: any) => {

  let local = false
  if (typeof window !== "undefined" && (
      window.location.hostname == "0.0.0.0" ||
      window.location.hostname == "127.0.0.1" ||
      window.location.hostname == "localhost"
    )
  ) { local = true }

  return (
    <div className={styles.header}>
      <div>
        <div className={styles.title}>
          <Link to={local ? "http://" + window.location.hostname + ":8000" : "https://chora.io"}>
            <img src={icon} />
            <div>
              {"chora"}
            </div>
          </Link>
        </div>
        {context && <ConnectWallet {...context} />}
      </div>
    </div>
  )
}

export default Header
