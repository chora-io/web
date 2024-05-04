import { MsgUpdateGroupMetadata as Msg } from 'cosmos/api/cosmos/group/v1/tx'
import * as Long from 'long'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputIRI, InputNumber } from '..'

const MsgUpdateGroupMetadata = ({
  network,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [admin, setAdmin] = useState<string>('')
  const [groupId, setGroupId] = useState<string>('')
  const [metadata, setMetadata] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'cosmos.group.v1.MsgUpdateGroupMetadata',
      admin: wallet ? wallet.bech32Address : admin,
      groupId: Long.fromString(groupId || '0'),
      metadata: metadata,
    }

    const msgAny = {
      typeUrl: '/cosmos.group.v1.MsgUpdateGroupMetadata',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [admin, groupId, metadata, wallet])

  return (
    <>
      <InputNumber
        id="msg-update-group-admin-group-id"
        label="group id"
        number={groupId}
        setNumber={setGroupId}
      />
      {!useWallet && (
        <InputAddress
          id="msg-update-group-admin-admin"
          label="admin"
          long={true}
          network={network}
          address={admin}
          setAddress={setAdmin}
        />
      )}
      <InputIRI
        id="msg-update-group-admin-metadata"
        label="new metadata"
        network={network}
        address={metadata}
        setAddress={setMetadata}
      />
    </>
  )
}

export default MsgUpdateGroupMetadata
