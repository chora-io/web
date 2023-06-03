import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"

import Result from "chora/components/Result"

import * as styles from "./QueryVouchers.module.css"

const queryVouchers = "/chora/voucher/v1/vouchers"

const QueryVouchers = () => {

  const { chainInfo } = useContext(WalletContext)

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryVouchers)
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
          {"QueryVouchers"}
        </h2>
        <p>
          {"query all vouchers"}
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

export default QueryVouchers
