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
          <Link to="/policies" activeStyle={activeStyle}>{"policies"}</Link>
        </li>
        <li>
          <Link to="/members" activeStyle={activeStyle}>{"members"}</Link>
        </li>
        <li>
          <Link to="/proposals" activeStyle={activeStyle}>{"proposals"}</Link>
        </li>
        <li>
          <Link to="/geonodes" activeStyle={activeStyle}>{"geonodes"}</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
