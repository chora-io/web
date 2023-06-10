import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { InputNumber, Result } from "chora/components"

import * as styles from "./QueryAllowance.module.css"

const queryAllowance = "/cosmos/feegrant/v1beta1"

const QueryAllowance = () => {

  const { chainInfo } = useContext(WalletContext)

  const [id, setId] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryAllowance + "/" + id)
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
    <div id="query-allowance" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"QueryAllowance"}
        </h2>
        <p>
          {"query an allowance by id"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputNumber
          id="query-allowance-id"
          label="allowance id"
          number={id}
          setNumber={setId}
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

export default QueryAllowance
