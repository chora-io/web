import { MsgUpdateMetadata as Msg } from 'cosmos/api/chora/voucher/v1/msg'
import * as Long from 'long'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputIRI, InputNumber } from '..'

const MsgUpdateMetadata = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [id, setId] = useState<string>('')
  const [issuer, setIssuer] = useState<string>('')
  const [newMetadata, setMetadata] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'chora.voucher.v1.MsgUpdateMetadata',
      id: Long.fromString(id || '0'),
      issuer: wallet ? wallet.bech32Address : issuer,
      newMetadata: newMetadata,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/chora.voucher.v1.MsgUpdateMetadata',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [id, issuer, newMetadata, wallet])

  return (
    <>
      <InputNumber
        id="msg-update-metadata-id"
        label="voucher id"
        network={network}
        number={id}
        setNumber={setId}
      />
      {!useWallet && (
        <InputAddress
          id="msg-update-metadata-issuer"
          label="issuer"
          long={true}
          network={network}
          address={issuer}
          setAddress={setIssuer}
        />
      )}
      <InputIRI
        id="msg-update-metadata-new-metadata"
        label="new metadata"
        network={network}
        iri={newMetadata}
        setIri={setMetadata}
      />
    </>
  )
}

export default MsgUpdateMetadata
