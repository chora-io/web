import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"

import InputURL from "chora/components/InputURL"
import Result from "chora/components/Result"

import * as styles from "./QueryResolversByURL.module.css"

const queryResolversByUrl = "/regen/data/v1/resolvers-by-url"

const QueryResolversByURL = () => {

  const { chainInfo } = useContext(WalletContext)

  const [url, setUrl] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryResolversByUrl, {
      method: "POST",
      body: JSON.stringify({ url: url }),
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
          <InputURL
            id="resolver-url"
            label="resolver url"
            placeholder="https://server.chora.io"
            url={url}
            setUrl={setUrl}
          />
          <button type="submit">
            {"search"}
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

export default QueryResolversByURL
