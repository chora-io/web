import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import InputIRI from "chora/components/InputIRI"
import Result from "chora/components/Result"
import SelectNetwork from "chora/components/SelectNetwork"

import * as styles from "./QueryAttestationsByIRI.module.css"

const queryAttestationsByIRI = "/regen/data/v1/attestations-by-iri"

const QueryAttestationsByIRI = () => {

  const { chainInfo, network, setNetwork } = useContext(WalletContext)

  const [iri, setIri] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryAttestationsByIRI + "/" + iri)
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
          <InputIRI
            network={network}
            iri={iri}
            setIri={setIri}
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

export default QueryAttestationsByIRI
