import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"

import InputAddress from "chora/components/InputAddress"
import Result from "chora/components/Result"

import * as styles from "./QueryGroupPoliciesByAdmin.module.css"

const queryGroupPoliciesByAdmin = "/cosmos/group/v1/group_policies_by_admin"

const QueryGroupPoliciesByAdmin = () => {

  const { chainInfo, network } = useContext(WalletContext)

  // form input
  const [admin, setAdmin] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryGroupPoliciesByAdmin + "/" + admin)
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
    <div id="query-group-policies-by-admin" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"QueryGroupPoliciesByAdmin"}
        </h2>
        <p>
          {"query group policies by the address of the admin"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-group-policies-by-admin-admin"
          label="admin"
          network={network}
          address={admin}
          setAddress={setAdmin}
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

export default QueryGroupPoliciesByAdmin
