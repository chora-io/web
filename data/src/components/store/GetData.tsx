import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"

import InputIRI from "chora/components/InputIRI"
import Result from "chora/components/Result"

import * as styles from "./GetData.module.css"

const serverUrl = "https://server.chora.io"

const GetData = () => {

  const { network } = useContext(WalletContext)

  // data input
  const [iri, setIri] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(serverUrl + "/" + iri)
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
          {"get data"}
        </h2>
        <p>
          {"get a json-ld document by iri from the chora server"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputIRI
          network={network}
          iri={iri}
          setIri={setIri}
        />
        <button type="submit">
          {"get data"}
        </button>
      </form>
      <Result
        error={error}
        success={success}
      />
    </div>
  )
}

export default GetData
