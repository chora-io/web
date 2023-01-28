import * as React from "react"

import { formatTimestamp } from "chora/utils/timestamp"

import * as styles from "./AuthzGrant.module.css"

const AuthzGrant = ({ grant }) => (
  <div className={styles.container}>
    <div className={styles.item}>
      <h3>
        {"granter"}
      </h3>
      <p>
        {grant["granter"]}
      </p>
    </div>
    <div className={styles.item}>
      <h3>
        {"grantee"}
      </h3>
      <p>
        {grant["grantee"]}
      </p>
    </div>
    {grant["authorization"]["@type"] === "/cosmos.authz.v1beta1.GenericAuthorization" && (
      <div className={styles.item}>
        <h3>
          {"message"}
        </h3>
        <p>
          {grant["authorization"]["msg"]}
        </p>
      </div>
    )}
    <div className={styles.item}>
      <h3>
        {"expiration"}
      </h3>
      <p>
        {formatTimestamp(grant["expiration"])}
      </p>
    </div>
  </div>
)

export default AuthzGrant
