import * as React from "react"

import ConnectWallet from "./ConnectWallet"

import * as styles from "./Header.module.css"

const Header = () => (
  <div className={styles.header}>
    <ConnectWallet />
  </div>
)

export default Header
