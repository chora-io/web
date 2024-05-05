import { MsgUpdateIssuer as Msg } from 'cosmos/api/chora/voucher/v1/msg'
import * as Long from 'long'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputNumber } from '..'

const MsgUpdateIssuer = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [id, setId] = useState<string>('')
  const [issuer, setIssuer] = useState<string>('')
  const [newIssuer, setNewIssuer] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'chora.voucher.v1.MsgUpdateIssuer',
      id: Long.fromString(id || '0'),
      issuer: wallet ? wallet.bech32Address : issuer,
      newIssuer: newIssuer,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/chora.voucher.v1.MsgUpdateIssuer',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [id, issuer, newIssuer, wallet])

  return (
    <>
      <InputNumber
        id="msg-update-issuer-id"
        label="voucher id"
        network={network}
        number={id}
        setNumber={setId}
      />
      {!useWallet && (
        <InputAddress
          id="msg-update-issuer-issuer"
          label="issuer"
          long={true}
          network={network}
          address={issuer}
          setAddress={setIssuer}
        />
      )}
      <InputAddress
        id="msg-update-issuer-new-issuer"
        label="new issuer"
        long={true}
        network={network}
        address={newIssuer}
        setAddress={setNewIssuer}
      />
    </>
  )
}

export default MsgUpdateIssuer
