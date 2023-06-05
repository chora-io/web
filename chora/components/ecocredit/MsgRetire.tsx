import * as React from "react"
import { useEffect, useState } from "react"

import { MsgRetire as Msg } from "../../api/regen/ecocredit/v1/tx"

import InputAddress from "../InputAddress"
import InputIRI from "../InputIRI"
import InputString from "../InputString"

const MsgRetire = ({ network, setMessage, useWallet, wallet }: any) => {
  const [owner, setOwner] = useState<string>("")
  const [credits, setCredits] = useState<string>("")
  const [jurisdiction, setJurisdiction] = useState<string>("")
  const [reason, setReason] = useState<string>("")

  useEffect(() => {
    const msg = {
      owner: wallet ? wallet.bech32Address : owner,
      credits: [], // credits,
      jurisdiction: jurisdiction,
      reason: reason,
    } as Msg

    const msgAny = {
      typeUrl: "/regen.ecocredit.v1.MsgRetire",
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [owner, credits, reason, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-retire-owner"
          label="owner"
          long={true}
          network={network}
          address={owner}
          setAddress={setOwner}
        />
      )}
      <InputString
        id="msg-retire-credits"
        label="credits"
        placeholder="[ not implemented ]"
        string={credits}
        setString={setCredits}
      />
      <InputString
        id="msg-retire-jurisdiction"
        label="jurisdiction"
        placeholder="US-WA"
        string={jurisdiction}
        setString={setJurisdiction}
      />
      <InputIRI
        id="msg-retire-reason"
        label="reason"
        network={network}
        iri={reason}
        setIri={setReason}
      />
    </>
  )
}

export default MsgRetire
