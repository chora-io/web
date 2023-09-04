import * as React from "react"
import { useEffect, useState } from "react"

import * as styles from "./Account.module.css"

const queryAccount = "/cosmos/auth/v1beta1/account"

const Account = ({ rest, account }) => {

  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    fetch(rest + "/" + queryAccount + "/" + account)
      .then(res => res.json())
      .then(data => {
        setResponse(data)
      })
      .catch(err => {
        setError(err.message)
      })
  }, [response])

  return (
    <div>
      <div className={styles.box}>
        <div>
          <h2>
            {"account"}
          </h2>
          {error !== "" && (
            <div className={styles.error}>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Account
