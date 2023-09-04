import * as React from "react"
import { useEffect, useState } from "react"

import * as styles from "./Transaction.module.css"

const queryTx = "cosmos/tx/v1beta1/txs"

const Transaction = ({ rest, tx }) => {

  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    fetch(rest + "/" + queryTx + "/" + tx)
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
            {"transaction"}
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

export default Transaction
