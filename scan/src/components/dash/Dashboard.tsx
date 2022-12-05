import * as React from "react"
import { Link } from "gatsby"

import Validators from "./Validators"

import * as styles from "./Dashboard.module.css"

const Dashboard = ({ chainId, chainName, rest }: any) => {

  // ...

  return (
    <div>
      <div className={styles.title}>
        <div>
          {chainName + " Dashboard"}
        </div>
        <div>
          <Link to={"/"}>
            {"back"}
          </Link>
        </div>
      </div>
      <Validators
        chainId={chainId}
        chainName={chainName}
        rest={rest}
      />
    </div>
  )
}

export default Dashboard
