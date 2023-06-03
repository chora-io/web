import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"

import InputNumber from "chora/components/InputNumber"
import Result from "chora/components/Result"

import * as styles from "./QueryVoucher.module.css"

const queryVoucher = "/chora/voucher/v1/voucher"

const QueryVoucher = () => {

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

    fetch(chainInfo.rest + queryVoucher + "/" + id)
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
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"QueryVoucher"}
        </h2>
        <p>
          {"query a voucher by the id of the voucher"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputNumber
          id="query-voucher-id"
          label="voucher id"
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

export default QueryVoucher
