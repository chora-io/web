import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { InputAddress, Result } from "chora/components"

import * as styles from "./QueryGroupPolicyInfo.module.css"

const queryGroupPolicyInfo = "/cosmos/group/v1/group_policy_info"

const QueryGroupPolicyInfo = () => {

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

    fetch(chainInfo.rest + queryGroupPolicyInfo + "/" + address)
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
    <div id="query-group-policy" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"QueryGroupPolicyInfo"}
        </h2>
        <p>
          {"query a group policy by the address of the policy"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-group-policy-address"
          label="policy address"
          network={network}
          long={true}
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

export default QueryGroupPolicyInfo