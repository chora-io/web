import * as React from "react"
import { useEffect, useState } from "react"
import { Buffer } from "buffer"
import * as blake from "blakejs"
import * as jsonld from "jsonld"

import InputJSON from "../InputJSON"
import SelectSchema from "../SelectSchema"
import SelectDigestAlgorithm from "../SelectDigestAlgorithm"

import * as styles from "./GenerateHash.module.css"

const schemaUrl = "https://schema.chora.io/contexts/index.jsonld"

const GenerateHash = () => {

  // data schema
  const [schema, setSchema] = useState<string>("")
  const [schemas, setSchemas] = useState<string[]>([])
  const [example, setExample] = useState<string>("")
  const [template, setTemplate] = useState<string>("")

  // json input
  const [json, setJson] = useState<string>("")

  // digest input
  const [digest, setDigest] = useState<number>(0)

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  useEffect(() => {

    // fetch available schemas
    fetch(schemaUrl)
      .then(res => res.json())
      .then(data => {
        const urls = []
        for (const p in data) {
          urls.push(data[p])
        }
        setSchemas(urls)
      })
      .catch(err => {
        setError(err.message)
      })
  }, [schemas.length])

  const handleGenJson = (event) => {
    event.preventDefault()

    setJson(template)
    setError("")
  }

  const handleSetJson = (value) => {
    setJson(value)
    setError("")
  }

  const handleSetSchema = (value) => {
    setSchema(value)
    setJson("")
    setError("")
  }

  const handleSubmit = async (event) => {
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

    if (canonized == "") {
      setError("JSON-LD empty after canonized")
      return
    }

    if (digest == 1) {
      // generate hash bytes using blake2b
      const bz = blake.blake2b(canonized, null, 32)

      // convert hash bytes to base64 string
      const hash = Buffer.from(bz).toString("base64")

      setSuccess(hash)
    } else {
      setError("digest algorithm cannot be unspecified")
    }
  }

  return (
    <>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="canon">
            {"canon"}
            <input value="URDNA2015" disabled />
          </label>
          <SelectSchema
            schema={schema}
            schemas={schemas}
            setExample={setExample}
            setSchema={handleSetSchema}
            setTemplate={setTemplate}
          />
          {schema.length > 0 && (
            <InputJSON
              json={json}
              placeholder={example}
              setJson={handleSetJson}
              useTemplate={handleGenJson}
            />
          )}
          <SelectDigestAlgorithm
            digest={digest}
            setDigest={setDigest}
          />
          <button type="submit">
            {"generate hash"}
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
