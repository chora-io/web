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
        <Link to="/data" activeClassName={styles.active}>
          {"data"}
        </Link>
      </li>
      <li>
        <Link to="/geonode" activeClassName={styles.active}>
          {"geonode"}
        </Link>
      </li>
      <li>
        <Link to="/group" activeClassName={styles.active}>
          {"group"}
        </Link>
      </li>
      <li>
        <Link to="/voucher" activeClassName={styles.active}>
          {"voucher"}
        </Link>
      </li>
    </ul>
  </div>
)

export default Sidebar
