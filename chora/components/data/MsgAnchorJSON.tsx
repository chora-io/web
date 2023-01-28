import * as React from "react"
import { useEffect, useState } from "react"

import { MsgAnchor as Msg } from "../../api/regen/data/v1/tx"

import InputAddress from "../InputAddress"
import InputContentHashJSON from "../InputContentHashJSON"

const MsgAnchorJSON = ({ network, setMessage, useWallet, wallet }: any) => {

  const [sender, setSender] = useState<string>("")
  const [contentHashJson, setContentHashJson] = useState<string>("")

  useEffect(() => {

    let contentHash: any

    try {
      contentHash = JSON.parse(contentHashJson)
    } catch (err) {
      contentHash = undefined
    }

    const msg = {
      sender: wallet ? wallet.bech32Address : sender,
      contentHash: contentHash,
    } as Msg

    const msgAny = {
      typeUrl: "/regen.data.v1.MsgAnchor",
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [sender, contentHashJson, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-anchor-sender"
          label="sender"
          long={true}
          network={network}
          address={sender}
          setAddress={setSender}
        />
      )}
      <InputContentHashJSON
        id="msg-anchor-content-hash"
        label="content hash"
        json={contentHashJson}
        setJson={setContentHashJson}
      />
    </>
  )
}

export default MsgAnchorJSON
