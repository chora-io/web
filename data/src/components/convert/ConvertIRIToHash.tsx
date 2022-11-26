import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "../../context/WalletContext"
import SelectNetwork from "../SelectNetwork"

import * as styles from "./ConvertIRIToHash.module.css"

const convertIRIToHash = "/regen/data/v1/convert-iri-to-hash"
const iriPlaceholder = "regen:13toVfvC2YxrrfSXWB5h2BGHiXZURsKxWUz72uDRDSPMCrYPguGUXSC.rdf"

const ConvertIRIToHash = () => {

  // @ts-ignore
  const { chainInfo } = useContext(WalletContext)

  const [iri, setIri] = useState("")
  const [error, setError] = useState("")
  const [result, setResult] = useState("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setResult("")

    fetch(chainInfo.rest + convertIRIToHash + "/" + iri)
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setError(data.message)
        } else {
          setResult(JSON.stringify(data.content_hash, null, "\t"))
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
          <label htmlFor="iri">
            {"iri"}
            <input
              id="iri"
              value={iri}
              placeholder={iriPlaceholder}
              onChange={event => setIri(event.target.value)}
            />
          </label>
          <SelectNetwork />
          <button type="submit">
            {"convert"}
          </button>
        </form>
      </div>
      {error != "" && (
        <div className={styles.error}>
          {error}
        </div>
      )}
      {result != "" && (
        <div>
          <pre>
            {result}
          </pre>
        </div>
      )}
    </>
  )
}

export default ConvertIRIToHash
