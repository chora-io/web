import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "../../context/WalletContext"
import SelectNetwork from "../SelectNetwork"

import * as styles from "./QueryResolversByURL.module.css"

const queryResolversByURL = "/regen/data/v1/resolvers-by-url"
const urlPlaceholder = "https://data.chora.io"

const QueryResolversByURL = () => {

  // @ts-ignore
  const { chainInfo } = useContext(WalletContext)

  const [url, setUrl] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryResolversByURL, {
      method: "POST",
      body: `{"url": "${url}"}`,
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
          <label htmlFor="url">
            {"url"}
            <input
              id="url"
              value={url}
              placeholder={urlPlaceholder}
              onChange={event => setUrl(event.target.value)}
            />
          </label>
          <SelectNetwork withLabel={true} />
          <button type="submit">
            {"search"}
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

export default QueryResolversByURL
