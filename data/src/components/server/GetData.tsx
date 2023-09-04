import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { InputIRI, Result } from "chora/components"

import * as styles from "./GetData.module.css"

const serverUrl = process.env.CHORA_SERVER_URL
    ? process.env.CHORA_SERVER_URL + '/data'
    : "https://server.chora.io/data"

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
          {"get data by iri from chora server"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputIRI
          network={'chora'} // always for chora server
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
