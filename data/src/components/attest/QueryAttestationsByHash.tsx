import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "../../context/WalletContext"
import SelectNetwork from "../SelectNetwork"
import InputHash from "../InputHash"
import InputHashJSON from "../InputHashJSON"
import SelectDigestAlgorithm from "../SelectDigestAlgorithm"
import SelectInput from "../SelectInput"
import SelectGraphCanon from "../SelectGraphCanon"
import SelectGraphMerkle from "../SelectGraphMerkle"

import * as styles from "./QueryAttestationsByHash.module.css"

const queryAttestationsByHash = "/regen/data/v1/attestations-by-hash"

const QueryAttestationsByHash = () => {

  // @ts-ignore
  const { chainInfo } = useContext(WalletContext)

  // input option
  const [input, setInput] = useState("form")

  // form input
  const [hash, setHash] = useState<string>("")

  // json input
  const [json, setJson] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    let body: string
    if (input == "form") {
      body = JSON.stringify({
        contentHash: {
          graph: {
            hash: hash,
            digestAlgorithm: 1, // DIGEST_ALGORITHM_BLAKE2B_256
            canonicalizationAlgorithm: 1, // GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015
            merkleTree: 0, // GRAPH_MERKLE_TREE_NONE_UNSPECIFIED
          }
        }
      })
    } else {
      let contentHash = ""
      try {
        contentHash = JSON.parse(json)
      } catch (err) {
        setError(err.message)
        return // exit on error
      }
      body = JSON.stringify({
        contentHash: contentHash
      })
    }

    fetch(chainInfo.rest + queryAttestationsByHash, {
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

  return (
    <>
      <SelectInput
        input={input}
        setInput={setInput}
        setError={setError}
        setSuccess={setSuccess}
      />
      <div>
        {input == "form" ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <InputHash
              hash={hash}
              setHash={setHash}
            />
            <SelectDigestAlgorithm />
            <SelectGraphCanon />
            <SelectGraphMerkle />
            <SelectNetwork withLabel={true} />
            <button type="submit">
              {"search"}
            </button>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <InputHashJSON
              json={json}
              setJson={setJson}
            />
            <SelectNetwork withLabel={true} />
            <button type="submit">
              {"search"}
            </button>
          </form>
        )}
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

export default QueryAttestationsByHash
