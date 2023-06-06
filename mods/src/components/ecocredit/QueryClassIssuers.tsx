import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { InputString, Result } from "chora/components"

import * as styles from "./QueryClassIssuers.module.css"

const queryClassIssuers = "/regen/ecocredit/v1/class-issuers"

const QueryClassIssuers = () => {

  const { chainInfo } = useContext(WalletContext)

  // form input
  const [id, setId] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryClassIssuers + "/" + id)
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
    <div id="query-class-issuers" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"QueryClassIssuers"}
        </h2>
        <p>
          {"query credit class issuers by credit class id"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputString
          id="query-class-issuers-id"
          label="class id"
          placeholder="C01"
          string={id}
          setString={setId}
        />
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

export default QueryClassIssuers
