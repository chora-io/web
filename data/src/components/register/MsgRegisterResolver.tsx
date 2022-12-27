import * as React from "react"
import { useContext, useState } from "react"
import { Buffer } from "buffer"
import * as Long from "long"

import { WalletContext } from "../../contexts/WalletContext"
import { MsgRegisterResolver } from "../../../api/regen/data/v1/tx"
import { signAndBroadcast } from "../../utils/tx"

import InputHash from "../InputHash"
import InputHashJSON from "../InputHashJSON"
import InputResolverId from "../InputResolverId"
import ResultTx from "../ResultTx"
import SelectDataType from "../SelectDataType"
import SelectDigestAlgorithm from "../SelectDigestAlgorithm"
import SelectGraphCanon from "../SelectGraphCanon"
import SelectGraphMerkle from "../SelectGraphMerkle"
import SelectInput from "../SelectInput"
import SelectRawMedia from "../SelectRawMedia"

import * as styles from "./MsgRegisterResolver.module.css"

const MsgRegisterResolverView = () => {

  // @ts-ignore
  const { chainInfo, wallet } = useContext(WalletContext)

  // input option
  const [input, setInput] = useState("form")

  // resolver id input
  const [id, setId] = useState<string>("")

  // content hash form input
  const [hash, setHash] = useState<string>("")
  const [type, setType] = useState<string>("")
  const [media, setMedia] = useState<number>(0)

  // content hash json input
  const [json, setJson] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    let msg: MsgRegisterResolver
    if (input == "form") {
      if (type == "graph") {
        msg = {
          $type: "regen.data.v1.MsgRegisterResolver",
          manager: wallet.bech32Address,
          resolverId: Long.fromString(id),
          contentHashes: [
            {
              $type: "regen.data.v1.ContentHash",
              graph: {
                $type: "regen.data.v1.ContentHash.Graph",
                hash: Buffer.from(hash, "base64"),
                digestAlgorithm: 1, // DIGEST_ALGORITHM_BLAKE2B_256
                canonicalizationAlgorithm: 1, // GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015
                merkleTree: 0, // GRAPH_MERKLE_TREE_NONE_UNSPECIFIED
              },
            },
          ],
        }
      } else if (type == "raw") {
        msg = {
          $type: "regen.data.v1.MsgRegisterResolver",
          manager: wallet.bech32Address,
          resolverId: Long.fromString(id),
          contentHashes: [
            {
              $type: "regen.data.v1.ContentHash",
              raw: {
                $type: "regen.data.v1.ContentHash.Raw",
                hash: Buffer.from(hash, "base64"),
                digestAlgorithm: 1, // DIGEST_ALGORITHM_BLAKE2B_256
                mediaType: media,
              },
            },
          ],
        }
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
      msg = MsgRegisterResolver.fromJSON({
        resolverId: Long.fromString(id),
        manager: wallet.bech32Address,
        contentHashes: [contentHash],
      })
    }

    const encMsg = MsgRegisterResolver.encode(msg).finish()

    await signAndBroadcast(chainInfo, wallet.bech32Address, msg, encMsg)
      .then(res => {
        setSuccess(res)
      }).catch(err => {
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
            <InputResolverId
              id={id}
              setId={setId}
            />
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
            <button type="submit">
              {"submit"}
            </button>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <InputResolverId
              id={id}
              setId={setId}
            />
            <InputHashJSON
              json={json}
              setJson={setJson}
            />
            <button type="submit">
              {"submit"}
            </button>
          </form>
        )}
      </div>
      <ResultTx
        error={error}
        rest={chainInfo?.rest}
        success={success}
      />
    </>
  )
}

export default MsgRegisterResolverView
