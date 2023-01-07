import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"

import InputHash from "../InputHash"
import InputHashJSON from "../InputHashJSON"
import Result from "../Result"
import SelectDataType from "../SelectDataType"
import SelectDigestAlgorithm from "../SelectDigestAlgorithm"
import SelectGraphCanon from "../SelectGraphCanon"
import SelectGraphMerkle from "../SelectGraphMerkle"
import SelectInput from "../SelectInput"
import SelectNetwork from "../SelectNetwork"
import SelectRawMedia from "../SelectRawMedia"

import * as styles from "./QueryAnchorByHash.module.css"

const queryAnchorByHash = "/regen/data/v1/anchor-by-hash"

const QueryAnchorByHash = () => {

  const { chainInfo } = useContext(WalletContext)

  // input option
  const [input, setInput] = useState("form")

  // form input
  const [hash, setHash] = useState<string>("")
  const [type, setType] = useState<string>("")
  const [media, setMedia] = useState<number>(0)

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
      if (type == "graph") {
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
      } else if (type == "raw") {
        body = JSON.stringify({
          contentHash: {
            raw: {
              hash: hash,
              digestAlgorithm: 1, // DIGEST_ALGORITHM_BLAKE2B_256
              mediaType: Number(media),
            }
          }
        })
      } else {
        setError("data type is required")
        return // exit on error
      }
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
            <SelectDataType
              type={type}
              setType={setType}
            />
            {type == "graph" &&
              <>
                <SelectGraphCanon />
                <SelectGraphMerkle />
            </>
            }
            {type == "raw" &&
              <SelectRawMedia
                media={media}
                setMedia={setMedia}
              />
            }
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
      <Result
        error={error}
        success={success}
      />
    </>
  )
}

export default QueryAnchorByHash
