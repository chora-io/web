import { useEffect, useState } from "react"

import styles from "./Account.module.css"

const queryAccount = "/cosmos/auth/v1beta1/account"

const Account = ({ rest, address }: any) => {

  const [response, setResponse] = useState<any>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    fetch(rest + "/" + queryAccount + "/" + address)
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
          {error && (
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
