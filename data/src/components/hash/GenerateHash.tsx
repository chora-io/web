import * as React from "react"
import { useEffect, useState } from "react"
import { Buffer } from "buffer"
import * as blake from "blakejs"
import * as jsonld from "jsonld"

import InputJSON from "../InputJSON"
import Result from "../Result"
import SelectDigestAlgorithm from "../SelectDigestAlgorithm"
import SelectGraphCanon from "../SelectGraphCanon"
import SelectGraphMerkle from "../SelectGraphMerkle"
import SelectSchemaContext from "../SelectSchemaContext"

import * as styles from "./GenerateHash.module.css"

const contextUrl = "https://schema.chora.io/contexts/index.jsonld"

const GenerateHash = () => {

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

  useEffect(() => {

    // fetch available schemas
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

    // generate hash bytes using blake2b
    const bz = blake.blake2b(canonized, undefined, 32)

    setSuccess(JSON.stringify({
      hash: Buffer.from(bz).toString("base64"),
      digestAlgorithm: "DIGEST_ALGORITHM_BLAKE2B_256",
      canonicalizationAlgorithm: "GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015",
      merkleTree: "GRAPH_MERKLE_TREE_NONE_UNSPECIFIED"
    }, null, "  "))
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
            {"generate hash"}
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

export default GenerateHash
