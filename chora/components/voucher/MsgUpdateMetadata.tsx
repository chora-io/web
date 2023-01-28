import * as React from "react"
import { useEffect, useState } from "react"
import * as Long from "long"

import { MsgUpdateMetadata as Msg } from "../../api/chora/voucher/v1/msg"

import InputAddress from "../InputAddress"
import InputIRI from "../InputIRI"
import InputNumber from "../InputNumber"

const MsgUpdateMetadata = ({ network, setMessage, useWallet, wallet }: any) => {

  const [id, setId] = useState<string>("")
  const [issuer, setIssuer] = useState<string>("")
  const [newMetadata, setMetadata] = useState<string>("")

  useEffect(() => {

    const msg = {
      id: Long.fromString(id || "0"),
      issuer: wallet ? wallet.bech32Address : issuer,
      newMetadata: newMetadata,
    } as Msg

    const msgAny = {
      typeUrl: "/chora.voucher.v1.MsgUpdateMetadata",
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [id, issuer, newMetadata, wallet])

  return (
    <>
      <InputNumber
        id="msg-update-metadata-id"
        label="voucher id"
        network={network}
        number={id}
        setNumber={setId}
      />
      {!useWallet && (
        <InputAddress
          id="msg-update-metadata-issuer"
          label="issuer"
          long={true}
          network={network}
          address={issuer}
          setAddress={setIssuer}
        />
      )}
      <InputIRI
        id="msg-update-metadata-new-metadata"
        label="new metadata"
        iri={newMetadata}
        setIri={setMetadata}
      />
    </>
  )
}

export default MsgUpdateMetadata
