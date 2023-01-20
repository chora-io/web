import * as React from "react"
import { useEffect, useState } from "react"

import { MsgCreate } from "../../api/chora/voucher/v1/msg"

import InputAddress from "../InputAddress"
import InputIRI from "../InputIRI"

const MsgCreateInputs = ({ network, setMessage }: any) => {

  const [issuer, setIssuer] = useState<string>("")
  const [metadata, setMetadata] = useState<string>("")

  useEffect(() => {

    const msg = {
        $type: "chora.voucher.v1.MsgCreate",
        issuer: issuer,
        metadata: metadata,
    } as MsgCreate

    const msgAny = {
        typeUrl: "/chora.voucher.v1.MsgCreate",
        value: MsgCreate.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [issuer, metadata])

  return (
    <>
      <InputAddress
        id="msg-create-issuer"
        label="issuer"
        long={true}
        network={network}
        address={issuer}
        setAddress={setIssuer}
      />
      <InputIRI
        id="msg-create-metadata"
        label="metadata"
        iri={metadata}
        setIri={setMetadata}
      />
    </>
  )
}

export default MsgCreateInputs
