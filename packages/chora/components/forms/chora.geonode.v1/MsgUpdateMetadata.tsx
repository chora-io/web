import { MsgUpdateMetadata as Msg } from 'cosmos/api/chora/geonode/v1/msg'
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
  const [curator, setCurator] = useState<string>('')
  const [newMetadata, setMetadata] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'chora.geonode.v1.MsgUpdateMetadata',
      id: Long.fromString(id || '0'),
      curator: wallet ? wallet.bech32Address : curator,
      newMetadata: newMetadata,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/chora.geonode.v1.MsgUpdateMetadata',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [id, curator, newMetadata, wallet])

  return (
    <>
      <InputNumber
        id="msg-update-metadata-id"
        label="node id"
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
        network={network}
        iri={newMetadata}
        setIri={setMetadata}
      />
    </>
  )
}

export default MsgUpdateMetadata
