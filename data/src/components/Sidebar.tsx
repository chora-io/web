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
    </ul>
  </div>
)

export default Sidebar
