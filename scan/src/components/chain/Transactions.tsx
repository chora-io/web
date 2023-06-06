import * as React from "react"
import { useState } from "react"
import { navigate } from "gatsby"

import { InputString, Result } from "chora/components"

import * as styles from "./Transactions.module.css"

const queryTx = "cosmos/tx/v1beta1/txs"

const Transactions = ({ chainId, rest }) => {
  const [tx, setTx] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")

    // TODO: validate tx

    if (tx) {

      // TODO: custom tx page
      // navigate(`?tx=${tx}`)

      navigate(rest + "/" + queryTx + "/" + tx)
    } else {
      setError("transaction cannot be empty")
    }
  }

  return (
      <div className={styles.box}>
        <div>
          <h2>
            {"transactions"}
          </h2>
        </div>
        <form className={styles.form}>
          <InputString
            id="transactions"
            label=""
            placeholder="E59E727B70BB47A13350E301532DC297B290F8C35AB84F5CFBAA2D92536FB712"
            network={chainId}
            tx={tx}
            setString={setTx}
          />
          <button type="submit" onClick={handleSubmit}>
            {"search"}
          </button>
        </form>
        <div className={styles.result}>
          <Result error={error} />
        </div>
      </div>
  )
}

export default Transactions
