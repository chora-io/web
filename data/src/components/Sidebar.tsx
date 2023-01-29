import * as React from "react"
import { Link } from "gatsby"

import * as styles from "./Sidebar.module.css"

const Sidebar = () => (
  <div className={styles.sidebar}>
    <ul>
      <li>
        <Link to="/" activeClassName={styles.active}>
          {"home"}
        </Link>
      </li>
      <li>
        <Link to="/hash" activeClassName={styles.active}>
          {"hash"}
        </Link>
      </li>
      <li>
        <Link to="/store" activeClassName={styles.active}>
          {"store"}
        </Link>
      </li>
      <li>
        <Link to="/convert" activeClassName={styles.active}>
          {"convert"}
        </Link>
      </li>
      <li>
        <Link to="/anchor" activeClassName={styles.active}>
          {"anchor"}
        </Link>
      </li>
      <li>
        <Link to="/attest" activeClassName={styles.active}>
          {"attest"}
        </Link>
      </li>
      <li>
        <Link to="/register" activeClassName={styles.active}>
          {"register"}
        </Link>
      </li>
    </ul>
  </div>
)

export default Sidebar
