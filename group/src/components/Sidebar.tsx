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
          <Link to="/create" activeStyle={activeStyle}>{"create"}</Link>
        </li>
        <li>
          <Link to="/update" activeStyle={activeStyle}>{"update"}</Link>
        </li>
        <li>
          <Link to="/policy" activeStyle={activeStyle}>{"policy"}</Link>
        </li>
        <li>
          <Link to="/proposal" activeStyle={activeStyle}>{"proposal"}</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
