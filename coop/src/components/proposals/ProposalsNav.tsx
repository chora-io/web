import * as React from "react"
import { Link } from "gatsby"

import * as styles from "./ProposalsNav.module.css"

const ProposalsNav = () => (
  <div className={styles.box}>
    <Link to="/proposals/new">
      {"submit proposal"}
    </Link>
  </div>
)

export default ProposalsNav
