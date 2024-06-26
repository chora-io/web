import { MsgCreate as Msg } from 'cosmos/api/chora/voucher/v1/msg'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputIRI } from '..'

const MsgCreate = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [issuer, setIssuer] = useState<string>('')
  const [metadata, setMetadata] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'chora.voucher.v1.MsgCreate',
      issuer: wallet ? wallet.bech32Address : issuer,
      metadata: metadata,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/chora.voucher.v1.MsgCreate',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [issuer, metadata, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-create-issuer"
          label="issuer"
          long={true}
          network={network}
          address={issuer}
          setAddress={setIssuer}
        />
      )}
      <InputIRI
        id="msg-create-metadata"
        label="metadata"
        network={network}
        iri={metadata}
        setIri={setMetadata}
      />
    </>
  )
}

export default MsgCreate
