import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "../../context/WalletContext"
import SelectNetwork from "../SelectNetwork"

import * as styles from "./QueryAnchorByHash.module.css"

const queryAnchorByHash = "/regen/data/v1/anchor-by-hash"
const hashPlaceholder = `{
  "content_hash": {
    "graph": {
      "hash": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
      "digest_algorithm": "DIGEST_ALGORITHM_BLAKE2B_256",
      "canonicalization_algorithm": "GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015",
      "merkle_tree": "GRAPH_MERKLE_TREE_NONE_UNSPECIFIED"
    }
  }
}`

const QueryAnchorByHash = () => {

  // @ts-ignore
  const { chainInfo } = useContext(WalletContext)

  const [hash, setHash] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryAnchorByHash, {
      method: "POST",
      body: hash,
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
          <label htmlFor="hash">
            {"hash"}
            <textarea
              id="hash"
              value={hash}
              placeholder={hashPlaceholder}
              onChange={event => setHash(event.target.value)}
            />
          </label>
          <SelectNetwork />
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

export default QueryAnchorByHash
