import { MsgDelete as Msg } from 'cosmos/api/chora/content/v1/msg'
import * as Long from 'long'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputNumber } from '..'

const MsgDelete = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [id, setId] = useState<string>('')
  const [curator, setCurator] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'chora.content.v1.MsgDelete',
      id: Long.fromString(id || '0'),
      curator: wallet ? wallet.bech32Address : curator,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/chora.content.v1.MsgDelete',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [id, curator, wallet])

  return (
    <>
      <InputNumber
        id="msg-delete-id"
        label="content id"
        network={network}
        number={id}
        setNumber={setId}
      />
      {!useWallet && (
        <InputAddress
          id="msg-delete-curator"
          label="curator"
          long={true}
          network={network}
          address={curator}
          setAddress={setCurator}
        />
      )}
    </>
  )
}

export default MsgDelete
