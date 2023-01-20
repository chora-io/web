import * as React from "react"
import { useEffect, useState } from "react"
import * as Long from "long"

import { MsgUpdateIssuer } from "../../api/chora/voucher/v1/msg"

import InputAddress from "../InputAddress"
import InputNumber from "../InputNumber"

const MsgUpdateIssuerInputs = ({ network, setMessage }: any) => {

  const [id, setId] = useState<string>("")
  const [issuer, setIssuer] = useState<string>("")
  const [newIssuer, setNewIssuer] = useState<string>("")

  useEffect(() => {

    const msg = {
        $type: "chora.voucher.v1.MsgUpdateIssuer",
        id: Long.fromString(id || "0"),
        issuer: issuer,
        newIssuer: newIssuer,
    } as MsgUpdateIssuer

    const msgAny = {
        typeUrl: "/chora.voucher.v1.MsgUpdateIssuer",
        value: MsgUpdateIssuer.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [id, issuer, newIssuer])

  return (
    <>
      <InputNumber
        id="msg-update-issuer-id"
        label="id"
        network={network}
        number={id}
        setNumber={setId}
      />
      <InputAddress
        id="msg-update-issuer-issuer"
        label="issuer"
        long={true}
        network={network}
        address={issuer}
        setAddress={setIssuer}
      />
      <InputAddress
        id="msg-update-issuer-new-issuer"
        label="new issuer"
        long={true}
        network={network}
        address={newIssuer}
        setAddress={setNewIssuer}
      />
    </>
  )
}

export default MsgUpdateIssuerInputs
