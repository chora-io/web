import * as React from "react"
import { useEffect, useState } from "react"
import * as jsonld from "jsonld"

import InputJSON from "../InputJSON"
import SelectSchema from "../SelectSchema"

import * as styles from "./PostData.module.css"

const schemaUrl = "https://schema.chora.io/contexts/index.jsonld"

const localServerUrl = "http://localhost:3000/data"
const remoteServerUrl = "https://server.chora.io/data"

const PostData = () => {

  let serverUrl = remoteServerUrl
  if (typeof window !== "undefined" && (
      window.location.hostname == "0.0.0.0" ||
      window.location.hostname == "127.0.0.1" ||
      window.location.hostname == "localhost"
    )
  ) { serverUrl = localServerUrl }

  // data schema
  const [schema, setSchema] = useState<string>("")
  const [schemas, setSchemas] = useState<string[]>([])
  const [example, setExample] = useState<string>("")
  const [template, setTemplate] = useState<string>("")

  // json input
  const [json, setJson] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  // fetch available schemas
  useEffect(() => {
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

    if (canonized == "") {
      setError("JSON-LD empty after canonized")
      return
    }

    const body = {
      canon: "URDNA2015",
      context: schema,
      jsonld: json,
    }

    fetch(serverUrl, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setError(data.message)
        } else {
          setSuccess(JSON.stringify(data, null, "\t"))
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
          <button type="submit">
            {"post data"}
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

export default PostData
