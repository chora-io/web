import * as React from "react"
import { useContext, useState } from "react"
import { Buffer } from "buffer"

import { WalletContext } from "chora"
import { MsgAnchor } from "chora/api/regen/data/v1/tx"
import { signAndBroadcast } from "chora/utils/tx"

import ResultTx from "chora/components/ResultTx"

import InputHash from "../InputHash"
import InputHashJSON from "../InputHashJSON"
import SelectDataType from "../SelectDataType"
import SelectDigestAlgorithm from "../SelectDigestAlgorithm"
import SelectGraphCanon from "../SelectGraphCanon"
import SelectGraphMerkle from "../SelectGraphMerkle"
import SelectInput from "../SelectInput"
import SelectRawMedia from "../SelectRawMedia"

import * as styles from "./MsgAnchor.module.css"

const MsgAnchorView = () => {

  const { chainInfo, wallet } = useContext(WalletContext)

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

    let msg: MsgAnchor
    if (input == "form") {
      if (type == "graph") {
        msg = {
          $type: "regen.data.v1.MsgAnchor",
          sender: wallet.bech32Address,
          contentHash: {
            $type: "regen.data.v1.ContentHash",
            graph: {
              $type: "regen.data.v1.ContentHash.Graph",
              hash: Buffer.from(hash, "base64"),
              digestAlgorithm: 1, // DIGEST_ALGORITHM_BLAKE2B_256
              canonicalizationAlgorithm: 1, // GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015
              merkleTree: 0, // GRAPH_MERKLE_TREE_NONE_UNSPECIFIED
            },
          },
        }
      } else if (type == "raw") {
        msg = {
          $type: "regen.data.v1.MsgAnchor",
          sender: wallet.bech32Address,
          contentHash: {
            $type: "regen.data.v1.ContentHash",
            raw: {
              $type: "regen.data.v1.ContentHash.Raw",
              hash: Buffer.from(hash, "base64"),
              digestAlgorithm: 1, // DIGEST_ALGORITHM_BLAKE2B_256
              mediaType: media,
            },
          },
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
      msg = MsgAnchor.fromJSON({
        sender: wallet.bech32Address,
        contentHash: contentHash,
      })
    }

    const encMsg = MsgAnchor.encode(msg).finish()

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

export default MsgAnchorView
