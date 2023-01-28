import * as React from "react"
import { useEffect, useState } from "react"

import { MsgAnchor as Msg } from "../../api/regen/data/v1/tx"

import InputAddress from "../InputAddress"
import InputContentHash from "../InputContentHash"

const MsgAnchor = ({ network, setMessage, useWallet, wallet }: any) => {

  // message inputs
  const [sender, setSender] = useState<string>("")
  const [contentHash, setContentHash] = useState<any>(undefined)

  useEffect(() => {

    const msg = {
      sender: wallet ? wallet.bech32Address : sender,
      contentHash: contentHash,
    } as Msg

    const msgAny = {
      typeUrl: "/regen.data.v1.MsgAnchor",
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [sender, contentHash, wallet])

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
      <InputContentHash
        id="msg-anchor-content-hash"
        label="content hash"
        contentHash={contentHash}
        setContentHash={setContentHash}
      />
    </>
  )
}

export default MsgAnchor
