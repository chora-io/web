import * as React from "react"
import { Link } from "gatsby"

import * as styles from "./Dashboard.module.css"

const Dashboard = ({ name }: any) => {

  // ...

  return (
    <div className={styles.container}>
      <div>
        {name + " Dashboard"}
      </div>
      <div>
        <Link to={"/"}>
          {"back"}
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
