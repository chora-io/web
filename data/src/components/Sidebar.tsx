import * as React from "react"
import { Link } from "gatsby"

import ConnectWallet from "./ConnectWallet"

import * as styles from "./Sidebar.module.css"

const Sidebar = () => {
  const activeStyle = { fontWeight: "600" }

  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <Link to="/" activeStyle={activeStyle}>{"home"}</Link>
        </li>
        <li>
          <Link to="/convert" activeStyle={activeStyle}>{"convert"}</Link>
        </li>
        <li>
          <Link to="/anchor" activeStyle={activeStyle}>{"anchor"}</Link>
        </li>
        <li>
          <Link to="/attest" activeStyle={activeStyle}>{"attest"}</Link>
        </li>
        <li>
          <Link to="/register" activeStyle={activeStyle}>{"register"}</Link>
        </li>
      </ul>
      <ConnectWallet />
    </div>
  )
}

export default Sidebar
