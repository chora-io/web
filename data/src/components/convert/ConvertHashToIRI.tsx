import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "../../context/WalletContext"
import InputHash from "../InputHash"
import InputHashJSON from "../InputHashJSON"
import SelectDataType from "../SelectDataType"
import SelectDigestAlgorithm from "../SelectDigestAlgorithm"
import SelectInput from "../SelectInput"
import SelectNetwork from "../SelectNetwork"
import SelectGraphCanon from "../SelectGraphCanon"
import SelectGraphMerkle from "../SelectGraphMerkle"
import SelectRawMedia from "../SelectRawMedia"

import * as styles from "./ConvertHashToIRI.module.css"

const convertIRIToHash = "/regen/data/v1/convert-hash-to-iri"

const ConvertHashToIRI = () => {

  // @ts-ignore
  const { chainInfo } = useContext(WalletContext)

  // input option
  const [input, setInput] = useState("form")

  // form input
  const [hash, setHash] = useState("")
  const [digest, setDigest] = useState<number>(0)
  const [type, setType] = useState<string>("")
  const [canon, setCanon] = useState<number>(0)
  const [merkle, setMerkle] = useState<number>(0)
  const [media, setMedia] = useState<number>(0)

  // json input
  const [json, setJson] = useState<string>("")

  // error and success
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

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

    fetch(chainInfo.rest + convertIRIToHash, {
      method: "POST",
      body: body,
    })
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setError(data.message)
        } else {
          setSuccess(data.iri)
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
            <SelectNetwork />
            <button type="submit">
              {"convert"}
            </button>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <InputHashJSON
              json={json}
              setJson={setJson}
            />
            <SelectNetwork />
            <button type="submit">
              {"convert"}
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

export default ConvertHashToIRI
