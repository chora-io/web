import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"

import InputIRI from "../InputIRI"
import Result from "../Result"
import SelectNetwork from "../SelectNetwork"

import * as styles from "./QueryResolversByIRI.module.css"

const queryResolversByIRI = "/regen/data/v1/resolvers-by-iri"

const QueryResolversByIRI = () => {

  const { chainInfo } = useContext(WalletContext)

  const [iri, setIri] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryResolversByIRI + "/" + iri)
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
            iri={iri}
            setIri={setIri}
          />
          <SelectNetwork withLabel={true} />
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

export default QueryResolversByIRI
