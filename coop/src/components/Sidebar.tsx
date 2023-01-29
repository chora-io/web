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
        <Link to="/policies" activeClassName={styles.active}>
          {"policies"}
        </Link>
      </li>
      <li>
        <Link to="/members" activeClassName={styles.active}>
          {"members"}
        </Link>
      </li>
      <li>
        <Link to="/proposals" activeClassName={styles.active}>
          {"proposals"}
        </Link>
      </li>
      <li>
        <Link to="/geonodes" activeClassName={styles.active}>
          {"geonodes"}
        </Link>
      </li>
      <li>
        <Link to="/vouchers" activeClassName={styles.active}>
          {"vouchers"}
        </Link>
      </li>
    </ul>
  </div>
)

export default Sidebar
