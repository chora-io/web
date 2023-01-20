import * as React from "react"
import { useEffect, useState } from "react"
import * as Long from "long"

import { MsgUpdateMetadata } from "../../api/chora/voucher/v1/msg"

import InputAddress from "../InputAddress"
import InputIRI from "../InputIRI"
import InputNumber from "../InputNumber"

const MsgUpdateMetadataInputs = ({ network, setMessage }: any) => {

  const [id, setId] = useState<string>("")
  const [issuer, setIssuer] = useState<string>("")
  const [newMetadata, setMetadata] = useState<string>("")

  useEffect(() => {

    const msg = {
        $type: "chora.voucher.v1.MsgUpdateMetadata",
        id: Long.fromString(id || "0"),
        issuer: issuer,
        newMetadata: newMetadata,
    } as MsgUpdateMetadata

    const msgAny = {
        typeUrl: "/chora.voucher.v1.MsgUpdateMetadata",
        value: MsgUpdateMetadata.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [id, issuer, newMetadata])

  return (
    <>
      <InputNumber
        id="msg-update-metadata-id"
        label="id"
        network={network}
        number={id}
        setNumber={setId}
      />
      <InputAddress
        id="msg-update-metadata-issuer"
        label="issuer"
        long={true}
        network={network}
        address={issuer}
        setAddress={setIssuer}
      />
      <InputIRI
        id="msg-update-metadata-new-metadata"
        label="new metadata"
        iri={newMetadata}
        setIri={setMetadata}
      />
    </>
  )
}

export default MsgUpdateMetadataInputs
