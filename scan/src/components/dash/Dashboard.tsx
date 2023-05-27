import * as React from "react"
import { Link } from "gatsby"

import Validators from "./Validators"

import * as styles from "./Dashboard.module.css"

const Dashboard = ({ chainId, chainName, rest }: any) => {

  // ...

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1>
            {chainName}
          </h1>
        </div>
        <div>
          <h3>
            {`(${chainId})`}
          </h3>
        </div>
      </div>
      <div className={styles.modules}>
        <Validators rest={rest} />
      </div>
    </div>
  )
}

export default Dashboard
