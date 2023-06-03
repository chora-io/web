import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"

import InputContentHash from "chora/components/data/InputContentHash"
import InputContentHashJSON from "chora/components/data/InputContentHashJSON"
import Result from "chora/components/Result"

import SelectInput from "../SelectInput"

import * as styles from "./QueryAnchorByHash.module.css"

const queryAnchorByHash = "/regen/data/v1/anchor-by-hash"

const QueryAnchorByHash = () => {

  const { chainInfo } = useContext(WalletContext)

  const [input, setInput] = useState("form")
  const [contentHash, setContentHash] = useState<any>(undefined)
  const [contentHashJson, setContentHashJson] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    let body: string

    if (input == "form") {
        body = JSON.stringify({ contentHash: contentHash })
    } else {
      let ch = ""
      try {
        ch = JSON.parse(contentHashJson)
      } catch (err) {
        setError(err.message)
        return // exit on error
      }
      body = JSON.stringify({ contentHash: ch })
    }

    fetch(chainInfo.rest + queryAnchorByHash, {
      method: "POST",
      body: body,
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

  const handleSetInput = (input) => {
    setInput(input)
    setError("")
    setSuccess("")
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"QueryAnchorByHash"}
        </h2>
        <p>
          {"query a data anchor by the content hash of a data entry"}
        </p>
      </div>
      <SelectInput
        input={input}
        setInput={handleSetInput}
      />
      {input == "form" ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputContentHash
            contentHash={contentHash}
            setContentHash={setContentHash}
          />
          <button type="submit">
            {"search"}
          </button>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputContentHashJSON
            json={contentHashJson}
            setJson={setContentHashJson}
          />
          <button type="submit">
            {"search"}
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

export default QueryAnchorByHash
