import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import InputNumber from "chora/components/InputNumber"
import Result from "chora/components/Result"
import SelectNetwork from "chora/components/SelectNetwork"

import * as styles from "./QueryProposal.module.css"

const queryProposal = "/cosmos/group/v1/proposal"

const QueryPolicy = () => {

  const { chainInfo, network, setNetwork } = useContext(WalletContext)

  // form input
  const [id, setId] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryProposal + "/" + id)
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
    <>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputNumber
            id="proposal-id"
            label="proposal id"
            number={id}
            setNumber={setId}
          />
          <SelectNetwork
            network={network}
            setNetwork={setNetwork}
          />
          <button type="submit">
            {"search"}
          </button>
        </form>
      </div>
      <Result
        error={error}
        success={success}
      />
    </>
  )
}

export default QueryPolicy
