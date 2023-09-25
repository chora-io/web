import * as React from "react"
import { useEffect, useState } from "react"

import { MsgBridge as Msg } from "../../api/regen/ecocredit/v1/tx"

import InputAddress from "../InputAddress"
import InputString from "../InputString"

const MsgBridge = ({ network, setMessage, useWallet, wallet }: any) => {
  const [owner, setOwner] = useState<string>("")
  const [target, setTarget] = useState<string>("")
  const [recipient, setRecipient] = useState<string>("")
  const [credits, setCredits] = useState<string>("")

  useEffect(() => {
    const msg = {
      owner: wallet ? wallet.bech32Address : owner,
      target: target,
      recipient: recipient,
      credits: [], // TODO
    } as unknown as Msg

    const msgAny = {
      typeUrl: "/regen.ecocredit.v1.MsgBridge",
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [owner, credits, target, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-bridge-owner"
          label="owner"
          long={true}
          network={network}
          address={owner}
          setAddress={setOwner}
        />
      )}
      <InputString
        id="msg-bridge-target"
        label="target"
        placeholder="polygon"
        string={target}
        setString={setTarget}
      />
      <InputAddress
        id="msg-bridge-recipient"
        label="recipient"
        placeholder="0x0"
        address={recipient}
        setAddress={setRecipient}
      />
      <InputString
        id="msg-bridge-credits"
        label="credits"
        placeholder="[ not implemented ]"
        string={credits}
        setString={setCredits}
      />
    </>
  )
}

export default MsgBridge
