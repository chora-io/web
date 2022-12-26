import * as React from "react"
import { Link } from "gatsby"

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
          <Link to="/hash" activeStyle={activeStyle}>{"hash"}</Link>
        </li>
        <li>
          <Link to="/store" activeStyle={activeStyle}>{"store"}</Link>
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
    </div>
  )
}

export default Sidebar
