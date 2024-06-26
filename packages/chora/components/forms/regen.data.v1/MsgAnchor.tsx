import { MsgAnchor as Msg } from 'cosmos/api/regen/data/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress } from '..'
import { InputContentHash } from '.'

const MsgAnchor = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [sender, setSender] = useState<string>('')
  const [contentHash, setContentHash] = useState<any>(undefined)

  useEffect(() => {
    const msg: Msg = {
      $type: 'regen.data.v1.MsgAnchor',
      sender: wallet ? wallet.bech32Address : sender,
      contentHash: contentHash,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/regen.data.v1.MsgAnchor',
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
