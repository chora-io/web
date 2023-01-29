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
        <Link to="/create" activeClassName={styles.active}>
          {"create"}
        </Link>
      </li>
      <li>
        <Link to="/update" activeClassName={styles.active}>
          {"update"}
        </Link>
      </li>
    </ul>
  </div>
)

export default Sidebar
