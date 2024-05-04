import { MsgAnchor as Msg } from 'cosmos/api/regen/data/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress } from '..'
import { InputContentHashJSON } from '.'

const MsgAnchorJSON = ({ network, setMessage, useWallet, wallet }: any) => {
  const [sender, setSender] = useState<string>('')
  const [contentHashJson, setContentHashJson] = useState<string>('')

  useEffect(() => {
    let contentHash: any

    try {
      contentHash = JSON.parse(contentHashJson)
    } catch (err) {
      contentHash = undefined
    }

    const msg: Msg = {
      $type: 'regen.data.v1.MsgAnchor',
      sender: wallet ? wallet.bech32Address : sender,
      contentHash: contentHash,
    }

    const msgAny = {
      typeUrl: '/regen.data.v1.MsgAnchor',
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
