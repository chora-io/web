import { MsgUpdateCurator as Msg } from 'cosmos/api/chora/content/v1/msg'
import * as Long from 'long'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputNumber } from '..'

const MsgUpdateCurator = ({ network, setMessage, useWallet, wallet }: any) => {
  const [id, setId] = useState<string>('')
  const [curator, setCurator] = useState<string>('')
  const [newCurator, setNewCurator] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'chora.content.v1.MsgUpdateCurator',
      id: Long.fromString(id || '0'),
      curator: wallet ? wallet.bech32Address : curator,
      newCurator: newCurator,
    }

    const msgAny = {
      typeUrl: '/chora.content.v1.MsgUpdateCurator',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [id, curator, newCurator, wallet])

  return (
    <>
      <InputNumber
        id="msg-update-curator-id"
        label="content id"
        network={network}
        number={id}
        setNumber={setId}
      />
      {!useWallet && (
        <InputAddress
          id="msg-update-curator-curator"
          label="curator"
          long={true}
          network={network}
          address={curator}
          setAddress={setCurator}
        />
      )}
      <InputAddress
        id="msg-update-curator-new-curator"
        label="new curator"
        long={true}
        network={network}
        address={newCurator}
        setAddress={setNewCurator}
      />
    </>
  )
}

export default MsgUpdateCurator
