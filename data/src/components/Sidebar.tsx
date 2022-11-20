import * as React from "react"
import { Link } from "gatsby"

import * as styles from "./Sidebar.module.css"

const Sidebar = () => (
  <div className={styles.sidebar}>
    <ul>
      <li>
        <Link to="/">{"home"}</Link>
      </li>
      <li>
        <Link to="/convert">{"convert"}</Link>
      </li>
      <li>
        <Link to="/anchor">{"anchor"}</Link>
      </li>
      <li>
        <Link to="/attest">{"attest"}</Link>
      </li>
      <li>
        <Link to="/register">{"register"}</Link>
      </li>
    </ul>
  </div>
)

export default Sidebar
