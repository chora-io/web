import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "../../contexts/WalletContext"

import InputResolverUrl from "../InputResolverUrl"
import Result from "../Result"
import SelectNetwork from "../SelectNetwork"

import * as styles from "./QueryResolversByURL.module.css"

const queryResolversByURL = "/regen/data/v1/resolvers-by-url"

const QueryResolversByURL = () => {

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
          <InputResolverUrl
            url={url}
            setUrl={setUrl}
          />
          <SelectNetwork withLabel={true} />
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
