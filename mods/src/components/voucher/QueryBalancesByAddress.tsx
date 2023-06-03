import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"

import InputAddress from "chora/components/InputAddress"
import Result from "chora/components/Result"

import * as styles from "./QueryBalancesByAddress.module.css"

const queryBalancesByAddress = "/chora/voucher/v1/balances-by-address"

const QueryBalancesByAddress = () => {

  const { chainInfo } = useContext(WalletContext)

  // form input
  const [address, setAddress] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryBalancesByAddress + "/" + address)
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
          {"QueryBalancesByAddress"}
        </h2>
        <p>
          {"query all balances by the address of the owner"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-balances-by-address-address"
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

export default QueryBalancesByAddress
