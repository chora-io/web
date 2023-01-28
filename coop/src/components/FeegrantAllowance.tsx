import * as React from "react"

import { formatTimestamp } from "chora/utils/timestamp"

import * as styles from "./FeegrantAllowance.module.css"

const FeegrantAllowance = ({ allowance }) => (
  <div className={styles.container}>
    <div className={styles.item}>
      <h3>
        {"granter"}
      </h3>
      <p>
        {allowance["granter"]}
      </p>
    </div>
    <div className={styles.item}>
      <h3>
        {"grantee"}
      </h3>
      <p>
        {allowance["grantee"]}
      </p>
    </div>
    {allowance["allowance"]["@type"] === "/cosmos.feegrant.v1beta1.BasicAllowance" && (
      <>
        <div className={styles.item}>
          <h3>
            {"spend limit"}
          </h3>
          <p>
            {allowance["allowance"]["spend_limit"]["amount"] + allowance["allowance"]["spend_limit"]["denom"]}
          </p>
        </div>
        <div className={styles.item}>
          <h3>
            {"expiration"}
          </h3>
          <p>
            {formatTimestamp(allowance["expiration"])}
          </p>
        </div>
      </>
    )}
  </div>
)

export default FeegrantAllowance
