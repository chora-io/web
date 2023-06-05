
import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"

import Result from "chora/components/Result"

import * as styles from "./QueryCreditTypes.module.css"

const queryCreditTypes = "/regen/ecocredit/v1/credit-types"

const QueryCreditTypes = () => {

  const { chainInfo } = useContext(WalletContext)

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryCreditTypes)
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setError(data.message)
        } else {
          setSuccess(JSON.stringify(data, null, "  "))
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }

  return (
    <div id="query-credit-types" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"QueryCreditTypes"}
        </h2>
        <p>
          {"query all credit types"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit">
          {"search"}
        </button>
      </form>
      <Result
        error={error}
        success={success}
      />
    </div>
  )
}

export default QueryCreditTypes
