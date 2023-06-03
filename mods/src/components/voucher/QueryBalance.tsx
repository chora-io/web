import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"

import InputAddress from "chora/components/InputAddress"
import InputNumber from "chora/components/InputNumber"
import Result from "chora/components/Result"

import * as styles from "./QueryBalance.module.css"

const queryBalance = "/chora/voucher/v1/balance"

const QueryBalance = () => {

  const { chainInfo } = useContext(WalletContext)

  // form input
  const [id, setId] = useState<string>("")
  const [address, setAddress] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryBalance + "/" + id + "/" + address)
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
          {"QueryBalance"}
        </h2>
        <p>
          {"query a balance by the id of the voucher and the address of the owner"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputNumber
          id="query-balance-id"
          label="voucher id"
          number={id}
          setNumber={setId}
        />
        <InputAddress
          id="query-balance-address"
          label="address"
          number={address}
          setNumber={setAddress}
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

export default QueryBalance
