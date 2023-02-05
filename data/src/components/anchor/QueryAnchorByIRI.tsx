import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"

import InputIRI from "chora/components/InputIRI"
import Result from "chora/components/Result"

import * as styles from "./QueryAnchorByIRI.module.css"

const queryAnchorByIRI = "/regen/data/v1/anchor-by-iri"

const QueryAnchorByIRI = () => {

  const { chainInfo, network } = useContext(WalletContext)

  const [iri, setIri] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryAnchorByIRI + "/" + iri)
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
          {"QueryAnchorByIRI"}
        </h2>
        <p>
          {"query a data anchor by the iri of a data entry"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputIRI
          network={network}
          iri={iri}
          setIri={setIri}
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

export default QueryAnchorByIRI
