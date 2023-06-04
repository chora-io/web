import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"

import InputAddress from "chora/components/InputAddress"
import Result from "chora/components/Result"

import * as styles from "./QueryAttestationsByAttestor.module.css"

const queryAttestationsByAttestor = "/regen/data/v1/attestations-by-attestor"

const QueryAttestationsByAttestor = () => {

  const { chainInfo } = useContext(WalletContext)

  const [attestor, setAttestor] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryAttestationsByAttestor + "/" + attestor)
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
    <div id="query-attestations-by-attestor" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"QueryAttestationsByAttestor"}
        </h2>
        <p>
          {"query data attestations by an attestor address"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          label="attestor"
          address={attestor}
          setAddress={setAttestor}
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

export default QueryAttestationsByAttestor
