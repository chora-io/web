import * as React from "react"
import { Link } from "gatsby"

import Chains from "./Chains"

import * as styles from "./Dashboard.module.css"

const Dashboard = () => {

  // ...

  return (
    <div>
      <div className={styles.header}>
        <h1>
          {"Network Scanner"}
        </h1>
      </div>
      <div className={styles.modules}>
        <Chains />
      </div>
    </div>
  )
}

export default Dashboard
