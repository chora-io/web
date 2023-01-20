import * as React from "react"
import { useContext, useState } from "react"
import * as Long from "long"

import { WalletContext } from "chora"
import { MsgUpdateMetadata } from "chora/api/chora/geonode/v1/msg"
import { signAndBroadcast } from "chora/utils/tx"

import InputIRI from "chora/components/InputIRI"
import InputNumber from "chora/components/InputNumber"
import ResultTx from "chora/components/ResultTx"

import * as styles from "./MsgUpdateMetadata.module.css"

const MsgUpdateMetadataView = () => {

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
      $type: "chora.geonode.v1.MsgUpdateMetadata",
      id: Long.fromString(id),
      curator: wallet.bech32Address,
      newMetadata: metadata,
    } as MsgUpdateMetadata

    const encMsg = MsgUpdateMetadata.encode(msg).finish()

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

export default MsgUpdateMetadataView
