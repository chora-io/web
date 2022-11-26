import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "../../context/WalletContext"
import SelectNetwork from "../SelectNetwork"
import InputHash from "../InputHash"
import InputHashJSON from "../InputHashJSON"
import SelectDataType from "../SelectDataType"
import SelectDigestAlgorithm from "../SelectDigestAlgorithm"
import SelectInput from "../SelectInput"
import SelectGraphCanon from "../SelectGraphCanon"
import SelectGraphMerkle from "../SelectGraphMerkle"
import SelectRawMedia from "../SelectRawMedia"

import * as styles from "./QueryAnchorByHash.module.css"

const queryAnchorByHash = "/regen/data/v1/anchor-by-hash"

const QueryAnchorByHash = () => {

  // @ts-ignore
  const { chainInfo } = useContext(WalletContext)

  // input option
  const [input, setInput] = useState("form")

  // form input
  const [hash, setHash] = useState<string>("")
  const [digest, setDigest] = useState<number>(0)
  const [type, setType] = useState<string>("")
  const [canon, setCanon] = useState<number>(0)
  const [merkle, setMerkle] = useState<number>(0)
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
          content_hash: {
            graph: {
              hash: hash,
              digest_algorithm: Number(digest),
              canonicalization_algorithm: Number(canon),
              merkle_tree: Number(merkle),
            }
          }
        })
      } else if (type == "raw") {
        body = JSON.stringify({
          content_hash: {
            raw: {
              hash: hash,
              digest_algorithm: Number(digest),
              media_type: Number(media),
            }
          }
        })
      } else {
        setError("data type is required")
        return // exit with error
      }
    } else {
      body = json
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
          setSuccess(JSON.stringify(data, null, "\t"))
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
            <SelectDigestAlgorithm
              digest={digest}
              setDigest={setDigest}
            />
            <SelectDataType
              type={type}
              setType={setType}
            />
            {type == "graph" &&
              <>
                <SelectGraphCanon
                  canon={canon}
                  setCanon={setCanon}
                />
                <SelectGraphMerkle
                  merkle={merkle}
                  setMerkle={setMerkle}
                />
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
