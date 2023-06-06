import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { InputNumber, Result } from "chora/components"

import * as styles from "./QueryResolver.module.css"

const queryResolver = "/regen/data/v1/resolver"

const QueryResolver = () => {

  const { chainInfo } = useContext(WalletContext)

  const [id, setId] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryResolver + "/" + id)
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
    <div id="query-resolver" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"QueryResolver"}
        </h2>
        <p>
          {"query a data resolver by the id of the resolver"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputNumber
          id="resolver-id"
          label="resolver id"
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

export default QueryResolver
