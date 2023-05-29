import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import InputIRI from "chora/components/InputIRI"
import Result from "chora/components/Result"

import * as styles from "./Search.module.css"

const dataUrl = "https://server.chora.io"

const Search = () => {
  const { chainInfo } = useContext(WalletContext)

  // data schema
  const [iri, setIri] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = (event) => {
    event.preventDefault()

    fetch(dataUrl + "/" + iri)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setSuccess(JSON.stringify(data, null, "  "))
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }

  if (chainInfo === undefined) {
      return <>loading</>
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"search"}
        </h2>
        <p>
          {`search ${chainInfo.chainId} and data resolvers`}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputIRI
          id="data-by-iri"
          label=""
          placeholder=""
          network={chainInfo.chainId}
          string={iri}
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

export default Search
