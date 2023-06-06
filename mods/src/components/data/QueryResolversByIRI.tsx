import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { InputIRI, Result } from "chora/components"

import * as styles from "./QueryResolversByIRI.module.css"

const queryResolversByIri = "/regen/data/v1/resolvers-by-iri"

const QueryResolversByIRI = () => {

  const { chainInfo, network } = useContext(WalletContext)

  const [iri, setIri] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryResolversByIri + "/" + iri)
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
    <div id="query-resolvers-by-iri" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"QueryResolversByIRI"}
        </h2>
        <p>
          {"query data resolvers by the iri of the data"}
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

export default QueryResolversByIRI
