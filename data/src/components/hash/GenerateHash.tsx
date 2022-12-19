import * as React from "react"
import { useState } from "react"
import { Buffer } from "buffer"
import * as blake from "blakejs"
import * as jsonld from "jsonld"

import InputJSON from "../InputJSON"

import * as styles from "./GenerateHash.module.css"

const GenerateHash = () => {

  // json input
  const [json, setJson] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    // check and parse JSON
    let doc: any
    try {
      doc = JSON.parse(json)
    } catch (err) {
      setError(err.message)
      return
    }

    // check and canonize JSON-LD
    const canonized = await jsonld.canonize(doc, {
      algorithm: "URDNA2015",
      format: "application/n-quads",
    }).catch(err => {
      setError(err.message)
      return
    })

    // generate hash bytes using blake2b
    const bz = blake.blake2b(canonized, null, 32)

    // convert hash bytes to base64 string
    const hash = Buffer.from(bz).toString("base64")

    setSuccess(hash)
  }

  return (
    <>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputJSON
            json={json}
            setJson={setJson}
          />
          <button type="submit">
            {"hash"}
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

export default GenerateHash
