import * as React from "react"
import { useEffect, useState } from "react"
import * as jsonld from "jsonld"

import InputJSON from "../InputJSON"
import Result from "../Result"
import SelectDigestAlgorithm from "../SelectDigestAlgorithm"
import SelectGraphCanon from "../SelectGraphCanon"
import SelectGraphMerkle from "../SelectGraphMerkle"
import SelectSchemaContext from "../SelectSchemaContext"

import * as styles from "./PostData.module.css"

const contextUrl = "https://schema.chora.io/contexts/index.jsonld"

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
  const [context, setContext] = useState<string>("")
  const [contexts, setContexts] = useState<string[]>([])
  const [example, setExample] = useState<string>("")
  const [template, setTemplate] = useState<string>("")

  // json input
  const [json, setJson] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  // fetch available contexts
  useEffect(() => {
    fetch(contextUrl)
      .then(res => res.json())
      .then(data => {
        const urls = []
        for (const p in data) {
          urls.push(data[p])
        }
        setContexts(urls)
      })
      .catch(err => {
        setError(err.message)
      })
  }, [contexts.length])

  const handleGenJson = (event) => {
    event.preventDefault()

    setJson(template)
    setError("")
  }

  const handleSetJson = (value) => {
    setJson(value)
    setError("")
  }

  const handleSetContext = (event) => {
    event.preventDefault()

    setContext(event.target.value)
    setJson("")
    setError("")

    if (event.target.value != "") {

      // fetch schema example
      fetch(event.target.value.replace("contexts", "examples"))
        .then(res => res.json())
        .then(data => {
          setExample(JSON.stringify(data,null, "  "))
        })
        .catch(err => {
          setExample(err.message)
        })

      // fetch schema template
      fetch(event.target.value.replace("contexts", "templates"))
        .then(res => res.json())
        .then(data => {
          setTemplate(JSON.stringify(data,null, "  "))
        })
        .catch(err => {
          setTemplate(err.message)
        })

    } else {
      setExample("")
      setTemplate("")
    }
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
      context: context,
      digest: "BLAKE2B_256",
      jsonld: json,
      merkle: "UNSPECIFIED"
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
          <SelectSchemaContext
            context={context}
            contexts={contexts}
            setContext={handleSetContext}
          />
          <InputJSON
            json={json}
            placeholder={example}
            setJson={handleSetJson}
            useTemplate={handleGenJson}
            showUseTemplate={context.length > 0}
          />
          <SelectDigestAlgorithm />
          <SelectGraphCanon />
          <SelectGraphMerkle />
          <button type="submit">
            {"post data"}
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

export default PostData
