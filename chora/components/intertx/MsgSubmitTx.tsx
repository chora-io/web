import * as React from "react"
import { useEffect, useState } from "react"

import { MsgSubmitTx as Msg } from "../../api/regen/intertx/v1/tx"

import InputAddress from "../InputAddress"
import InputString from "../InputString"
import SelectMessage from "../SelectMessage"

const MsgSubmitTx = ({ network, setMessage, useWallet, wallet }: any) => {
  const [owner, setOwner] = useState<string>("")
  const [connectionId, setConnectionId] = useState<string>("")
  const [txMsg, setTxMsg] = useState<any>(undefined)

  useEffect(() => {
    const msg = {
      owner: wallet ? wallet.bech32Address : owner,
      connectionId: connectionId,
      msg: txMsg,
    } as Msg

    const msgAny = {
      typeUrl: "/regen.intertx.v1.MsgSubmitTx",
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [owner, connectionId, txMsg, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-register-account-owner"
          label="owner"
          long={true}
          network={network}
          address={owner}
          setAddress={setOwner}
        />
      )}
      <InputString
        id="msg-register-account-connection-id"
        label="connection id"
        placeholder="connection-0"
        string={connectionId}
        setString={setConnectionId}
      />
      <SelectMessage
        id="msg-register-account-msg"
        label="msg"
        network={network}
        message={txMsg}
        setMessage={setTxMsg}
      />
    </>
  )
}

export default MsgSubmitTx
