import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "../../context/WalletContext"
import SelectNetwork from "../SelectNetwork"

import * as styles from "./QueryAttestationsByAttestor.module.css"

const queryAttestationsByAttestor = "/regen/data/v1/attestations-by-attestor"
const choraAttestorPlaceholder = "chora1jx34255cgvxpthkg572ma6rhq6crwl6xh7g0md"
const regenAttestorPlaceholder = "regen1jx34255cgvxpthkg572ma6rhq6crwl6x2s4ajx"

const QueryAttestationsByAttestor = () => {

  // @ts-ignore
  const { chainInfo } = useContext(WalletContext)

  const [attestor, setAttestor] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  let attestorPlaceholder: string
  if (chainInfo.chainId.includes("chora")) {
    attestorPlaceholder = choraAttestorPlaceholder
  } else {
    attestorPlaceholder = regenAttestorPlaceholder
  }

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
          setSuccess(JSON.stringify(data, null, "\t"))
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
          <label htmlFor="attestor">
            {"attestor"}
            <input
              id="attestor"
              value={attestor}
              placeholder={attestorPlaceholder}
              onChange={event => setAttestor(event.target.value)}
            />
          </label>
          <SelectNetwork />
          <button type="submit">
            {"search"}
          </button>
        </form>
      </div>
      {error != "" && (
        <div className={styles.error}>
          {error}
        </div>
      )}
      {success != "" && (
        <div>
          <pre>
            {success}
          </pre>
        </div>
      )}
    </>
  )
}

export default QueryAttestationsByAttestor
