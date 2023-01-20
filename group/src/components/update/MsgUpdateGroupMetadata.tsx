import * as React from "react"
import { useContext, useState } from "react"
import * as Long from "long"

import { WalletContext } from "chora"
import { MsgUpdateGroupMetadata } from "chora/api/cosmos/group/v1/tx"
import { signAndBroadcast } from "chora/utils/tx"

import InputIRI from "chora/components/InputIRI"
import InputNumber from "chora/components/InputNumber"
import ResultTx from "chora/components/ResultTx"

import * as styles from "./MsgUpdateGroupAdmin.module.css"

const MsgUpdateGroupMetadataView = () => {

  const { chainInfo, network, wallet } = useContext(WalletContext)

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
      $type: "cosmos.group.v1.MsgUpdateGroupMetadata",
      admin: wallet.bech32Address,
      groupId: Long.fromString(id),
      metadata: metadata,
    } as MsgUpdateGroupMetadata

    const encMsg = MsgUpdateGroupMetadata.encode(msg).finish()

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
            id="group-id"
            label="group id"
            number={id}
            setNumber={setId}
          />
          <InputIRI
            id="new-metadata"
            label="new metadata"
            network={network}
            iri={metadata}
            setIri={setMetadata}
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

export default MsgUpdateGroupMetadataView
