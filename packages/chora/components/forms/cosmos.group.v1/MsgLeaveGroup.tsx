import { MsgLeaveGroup as Msg } from 'cosmos/api/cosmos/group/v1/tx'
import * as Long from 'long'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputNumber } from '..'

const MsgLeaveGroup = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [address, setAdmin] = useState<string>('')
  const [groupId, setGroupId] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'cosmos.group.v1.MsgLeaveGroup',
      address: wallet ? wallet.bech32Address : address,
      groupId: Long.fromString(groupId || '0'),
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/cosmos.group.v1.MsgLeaveGroup',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [address, groupId, wallet])

  return (
    <>
      <InputNumber
        id="msg-leave-group-group-id"
        label="group id"
        number={groupId}
        setNumber={setGroupId}
      />
      {!useWallet && (
        <InputAddress
          id="msg-leave-group-address"
          label="address"
          network={network}
          address={address}
          setAddress={setAdmin}
        />
      )}
    </>
  )
}

export default MsgLeaveGroup
