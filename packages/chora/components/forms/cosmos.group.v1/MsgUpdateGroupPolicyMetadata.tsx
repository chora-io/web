import { MsgUpdateGroupPolicyMetadata as Msg } from 'cosmos/api/cosmos/group/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputIRI } from '..'

const MsgUpdateGroupPolicyMetadata = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [admin, setAdmin] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [metadata, setMetadata] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'cosmos.group.v1.MsgUpdateGroupPolicyMetadata',
      admin: wallet ? wallet.bech32Address : admin,
      groupPolicyAddress: address,
      metadata: metadata,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/cosmos.group.v1.MsgUpdateGroupPolicyMetadata',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [admin, address, metadata, wallet])

  return (
    <>
      <InputAddress
        id="msg-update-group-policy-metadata-address"
        label="policy address"
        long={true}
        network={network}
        address={address}
        setAddress={setAddress}
      />
      {!useWallet && (
        <InputAddress
          id="msg-update-group-policy-metadata-admin"
          label="policy admin"
          long={true}
          network={network}
          address={admin}
          setAddress={setAdmin}
        />
      )}
      <InputIRI
        id="msg-update-group-policy-metadata-metadata"
        label="policy metadata"
        network={network}
        iri={metadata}
        setIri={setMetadata}
      />
    </>
  )
}

export default MsgUpdateGroupPolicyMetadata
