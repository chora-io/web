import * as React from "react"
import { useContext, useState } from "react"
import { Buffer } from "buffer"

import { WalletContext } from "../../contexts/WalletContext"
import { MsgAttest } from "../../../api/regen/data/v1/tx"
import { signAndBroadcast } from "../../utils/tx"

import InputHash from "../InputHash"
import InputHashJSON from "../InputHashJSON"
import ResultTx from "../ResultTx"
import SelectDigestAlgorithm from "../SelectDigestAlgorithm"
import SelectGraphCanon from "../SelectGraphCanon"
import SelectGraphMerkle from "../SelectGraphMerkle"
import SelectInput from "../SelectInput"

import * as styles from "./MsgAttest.module.css"

const MsgAttestView = () => {

  const { chainInfo, wallet } = useContext(WalletContext)

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

    let msg: MsgAttest
    if (input == "form") {
      msg = {
        $type: "regen.data.v1.MsgAttest",
        attestor: wallet.bech32Address,
        contentHashes: [
          {
            $type: "regen.data.v1.ContentHash.Graph",
            hash: Buffer.from(hash, "base64"),
            digestAlgorithm: 1, // DIGEST_ALGORITHM_BLAKE2B_256
            canonicalizationAlgorithm: 1, // GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015
            merkleTree: 0, // GRAPH_MERKLE_TREE_NONE_UNSPECIFIED
          },
        ],
      }
    } else {
      let contentHash = ""
      try {
        contentHash = JSON.parse(json)
      } catch (err) {
        setError(err.message)
        return // exit on error
      }
      msg = MsgAttest.fromJSON({
        attestor: wallet.bech32Address,
        contentHashes: [contentHash.graph]
      })
    }

    const encMsg = MsgAttest.encode(msg).finish()

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
            <SelectGraphCanon />
            <SelectGraphMerkle />
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

export default MsgAttestView
