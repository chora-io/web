import * as React from "react"
import { Link } from "gatsby"

import * as styles from "./MembersNav.module.css"

const MembersNav = () => (
  <div className={styles.box}>
    <Link to="/members/new">
      {"submit application"}
    </Link>
  </div>
)

export default MembersNav
