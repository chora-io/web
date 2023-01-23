import * as React from "react"
import { Link } from "gatsby"

import * as styles from "./ProposalsNav.module.css"

const ProposalsNav = () => (
  <div className={styles.container}>
    <Link to="/proposals/new">
      {"new proposal"}
    </Link>
  </div>
)

export default ProposalsNav
