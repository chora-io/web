import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"

import InputAddress from "chora/components/InputAddress"
import Result from "chora/components/Result"

import * as styles from "./QueryBalances.module.css"

const queryBalances = "/regen/ecocredit/v1/balances"

const QueryBalances = () => {

  const { chainInfo, network } = useContext(WalletContext)

  // form input
  const [address, setAddress] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryBalances + "/" + address)
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
    <div id="query-balances" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"QueryBalances"}
        </h2>
        <p>
          {"query all balances by credit owner address"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-balances-address"
          label="address"
          network={network}
          address={address}
          setAddress={setAddress}
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

export default QueryBalances
