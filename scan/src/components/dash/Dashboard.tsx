import * as React from "react"
import { Link } from "gatsby"

import * as styles from "./Dashboard.module.css"

const Dashboard = ({ name }: any) => {

  let local = false
  if (typeof window !== "undefined" && (
      window.location.hostname == "0.0.0.0" ||
      window.location.hostname == "127.0.0.1" ||
      window.location.hostname == "localhost"
    )
  ) { local = true }

  return (
    <div className={styles.container}>
      <div>
        {name + " Dashboard"}
      </div>
      <div>
        <Link to={local ? "/" : "/scan"}>
          {"back"}
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
