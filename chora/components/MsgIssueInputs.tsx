import * as React from "react"
import { useEffect, useState } from "react"
import * as Long from "long"

import { MsgIssue } from "../api/chora/voucher/v1/msg"

import InputAddress from "./InputAddress"
import InputIRI from "./InputIRI"
import InputNumber from "./InputNumber"
import InputTimestamp from "./InputTimestamp"

const MsgIssueInputs = ({ network, setMessage }: any) => {

  const [id, setId] = useState<string>("")
  const [issuer, setIssuer] = useState<string>("")
  const [recipient, setRecipient] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [expiration, setExpiration] = useState<string>("")
  const [metadata, setMetadata] = useState<string>("")

  useEffect(() => {

    const msg = {
        $type: "chora.voucher.v1.MsgIssue",
        id: id ? Long.fromString(id) : undefined,
        issuer: issuer ? issuer : undefined,
        recipient: recipient ? recipient : undefined,
        amount: amount ? amount : undefined,
        expiration: expiration ? new Date(expiration) : undefined,
        metadata: metadata ? metadata : undefined,
    } as MsgIssue

    const msgAny = {
        typeUrl: "/chora.voucher.v1.MsgIssue",
        value: MsgIssue.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [id, issuer, recipient, amount, expiration, metadata])

  return (
    <>
      <InputNumber
        id="msg-issue-voucher-id"
        label="voucher id"
        network={network}
        number={id}
        setNumber={setId}
      />
      <InputAddress
        id="msg-issue-issuer"
        label="issuer"
        long={true}
        network={network}
        address={issuer}
        setAddress={setIssuer}
      />
      <InputAddress
        id="msg-issue-recipient"
        label="recipient"
        network={network}
        address={recipient}
        setAddress={setRecipient}
      />
      <InputNumber
        id="msg-issue-amount"
        label="amount"
        placeholder="1.25"
        number={amount}
        setNumber={setAmount}
      />
      <InputTimestamp
        id="msg-issue-expiration"
        label="expiration"
        timestamp={expiration}
        setTimestamp={setExpiration}
      />
      <InputIRI
        id="msg-issue-metadata"
        label="metadata"
        iri={metadata}
        setIri={setMetadata}
      />
    </>
  )
}

export default MsgIssueInputs
