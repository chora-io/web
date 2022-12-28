import * as React from "react"
import { useContext, useState } from "react"
import * as Long from "long"

import { WalletContext } from "../../contexts/WalletContext"
import { MsgUpdate } from "../../../api/chora/geonode/v1/msg"
import { signAndBroadcast } from "../../utils/tx"

import InputNumber from "../InputNumber"
import InputMetadata from "../InputMetadata"
import ResultTx from "../ResultTx"

import * as styles from "./MsgUpdate.module.css"

const MsgUpdateView = () => {

  // @ts-ignore
  const { chainInfo, wallet } = useContext(WalletContext)

  // form input
  const [id, setId] = useState<string>("")
  const [metadata, setMetadata] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    const msg = {
      $type: "chora.geonode.v1.MsgUpdate",
      curator: wallet.bech32Address,
      id: Long.fromString(id),
      newMetadata: metadata,
    } as MsgUpdate

    const encMsg = MsgUpdate.encode(msg).finish()

    await signAndBroadcast(chainInfo, wallet.bech32Address, msg, encMsg)
      .then(res => {
        setSuccess(res)
      }).catch(err => {
        setError(err.message)
      })
  }

  return (
    <>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputNumber
            id="node-id"
            label="node id"
            number={id}
            setNumber={setId}
          />
          <InputMetadata
            id="new-metadata"
            label="new metadata"
            metadata={metadata}
            setMetadata={setMetadata}
          />
          <button type="submit">
            {"submit"}
          </button>
        </form>
      </div>
      <ResultTx
        error={error}
        rest={chainInfo?.rest}
        success={success}
      />
    </>
  )
}

export default MsgUpdateView
