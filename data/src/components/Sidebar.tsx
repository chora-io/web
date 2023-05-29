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
        <Link to="/search" activeClassName={styles.active}>
          {"search"}
        </Link>
      </li>
      <li>
        <Link to="/schema" activeClassName={styles.active}>
          {"schema"}
        </Link>
      </li>
      <li>
        <Link to="/server" activeClassName={styles.active}>
          {"server"}
        </Link>
      </li>
    </ul>
  </div>
)

export default Sidebar
