import * as React from "react"
import { useEffect, useState } from "react"
import { Buffer } from "buffer"
import * as blake from "blakejs"
import * as jsonld from "jsonld"

import Result from "chora/components/Result"
import SelectDigestAlgorithm from "chora/components/SelectDigestAlgorithm"
import SelectGraphCanon from "chora/components/SelectGraphCanon"
import SelectGraphMerkle from "chora/components/SelectGraphMerkle"

import InputJSON from "../InputJSON"
import InputsFromJSON from "../InputsFromJSON"
import SelectContext from "../SelectContext"
import SelectInput from "../SelectInput"

import * as styles from "./GenerateHash.module.css"

const contextUrl = "https://schema.chora.io/contexts/index.jsonld"

const GenerateHash = () => {

  // input option
  const [input, setInput] = useState("form")

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
        data["itemListElement"].map(e => urls.push(e.item["@id"]))
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

    if (event.target.value !== "") {

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

    // check and normalize object
    const normalized = await jsonld.normalize(doc, {
      algorithm: "URDNA2015",
      format: "application/n-quads",
    }).catch(err => {
      setError(err.message)
      return
    })

    if (normalized == "") {
      setError("JSON-LD empty after normalized")
      return
    }

    // generate hash bytes using blake2b
    const bz = blake.blake2b(normalized, undefined, 32)

    setSuccess(JSON.stringify({
      hash: Buffer.from(bz).toString("base64"),
      digestAlgorithm: "DIGEST_ALGORITHM_BLAKE2B_256",
      canonicalizationAlgorithm: "GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015",
      merkleTree: "GRAPH_MERKLE_TREE_NONE_UNSPECIFIED"
    }, null, "  "))
  }

  const handleSetInput = (input) => {
    setInput(input)
    setError("")
    setSuccess("")
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"generate hash"}
        </h2>
        <p>
          {"generate a content hash from a json-ld document"}
        </p>
      </div>
      <SelectInput
        input={input}
        setInput={handleSetInput}
      />
      {input == "form" ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <SelectContext
            context={context}
            contexts={contexts}
            setContext={handleSetContext}
          />
          <InputsFromJSON
            example={example}
            json={json}
            setJson={setJson}
          />
          <SelectDigestAlgorithm
            digest={""} // disabled until multiple options exist
            setDigest={() => {}} // disabled until multiple options exist
          />
          <SelectGraphCanon
            canon={""} // disabled until multiple options exist
            setCanon={() => {}} // disabled until multiple options exist
          />
          <SelectGraphMerkle
            merkle={""} // disabled until multiple options exist
            setMerkle={() => {}} // disabled until multiple options exist
          />
          <button type="submit">
            {"generate"}
          </button>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <SelectContext
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
          <SelectDigestAlgorithm
            digest={""} // disabled until multiple options exist
            setDigest={() => {}} // disabled until multiple options exist
          />
          <SelectGraphCanon
            canon={""} // disabled until multiple options exist
            setCanon={() => {}} // disabled until multiple options exist
          />
          <SelectGraphMerkle
            merkle={""} // disabled until multiple options exist
            setMerkle={() => {}} // disabled until multiple options exist
          />
          <button type="submit">
            {"generate"}
          </button>
        </form>
      )}
      <Result
        error={error}
        success={success}
      />
    </div>
  )
}

export default GenerateHash
