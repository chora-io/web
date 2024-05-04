import { MsgUpdateMetadata as Msg } from 'cosmos/api/chora/content/v1/msg'
import * as Long from 'long'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputIRI, InputNumber } from '..'

const MsgUpdateMetadata = ({ network, setMessage, useWallet, wallet }: any) => {
  const [id, setId] = useState<string>('')
  const [curator, setCurator] = useState<string>('')
  const [newMetadata, setMetadata] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'chora.content.v1.MsgUpdateMetadata',
      id: Long.fromString(id || '0'),
      curator: wallet ? wallet.bech32Address : curator,
      newMetadata: newMetadata,
    }

    const msgAny = {
      typeUrl: '/chora.content.v1.MsgUpdateMetadata',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [id, curator, newMetadata, wallet])

  return (
    <>
      <InputNumber
        id="msg-update-metadata-id"
        label="content id"
        network={network}
        number={id}
        setNumber={setId}
      />
      {!useWallet && (
        <InputAddress
          id="msg-update-metadata-curator"
          label="curator"
          long={true}
          network={network}
          address={curator}
          setAddress={setCurator}
        />
      )}
      <InputIRI
        id="msg-update-metadata-new-metadata"
        label="new metadata"
        iri={newMetadata}
        setIri={setMetadata}
      />
    </>
  )
}

export default MsgUpdateMetadata
