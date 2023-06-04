import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"

import InputAddress from "chora/components/InputAddress"
import InputString from "chora/components/InputString"
import Result from "chora/components/Result"

import * as styles from "./QueryInterchainAccount.module.css"

const queryInterchainAccount = "/regen/intertx/v1/interchain-account"

const QueryNode = () => {

  const { chainInfo } = useContext(WalletContext)

  // form input
  const [owner, setOwner] = useState<string>("")
  const [connectionId, setConnectionId] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryInterchainAccount + "/" + owner + "/" + connectionId)
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
    <div id="query-interchain-account" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"QueryInterchainAccount"}
        </h2>
        <p>
          {"query an interchain account by owner and connection id"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-interchain-account-owner"
          label="owner"
          address={owner}
          setAddress={setOwner}
        />
        <InputString
          id="query-interchain-account-connection-id"
          label="connection id"
          placeholder="connection-0"
          number={connectionId}
          setNumber={setConnectionId}
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

export default QueryNode
