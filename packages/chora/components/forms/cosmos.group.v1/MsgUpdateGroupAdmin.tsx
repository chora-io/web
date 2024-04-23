import { MsgUpdateGroupAdmin as Msg } from 'cosmos/api/cosmos/group/v1/tx'
import * as Long from 'long'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputNumber } from '..'

const MsgUpdateGroupAdmin = ({
  network,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [admin, setAdmin] = useState<string>('')
  const [groupId, setGroupId] = useState<string>('')
  const [newAdmin, setNewAdmin] = useState<string>('')

  useEffect(() => {
    const msg = {
      admin: wallet ? wallet.bech32Address : admin,
      groupId: Long.fromString(groupId || '0'),
      newAdmin: newAdmin,
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/cosmos.group.v1.MsgUpdateGroupAdmin',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [admin, groupId, newAdmin, wallet])

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
      <InputAddress
        id="msg-update-group-admin-new-admin"
        label="new admin"
        long={true}
        network={network}
        address={newAdmin}
        setAddress={setNewAdmin}
      />
    </>
  )
}

export default MsgUpdateGroupAdmin
