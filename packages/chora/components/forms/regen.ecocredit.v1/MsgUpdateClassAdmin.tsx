import { MsgUpdateClassAdmin as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputString } from '..'

const MsgUpdateClassAdmin = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [admin, setAdmin] = useState<string>('')
  const [classId, setClassId] = useState<string>('')
  const [newAdmin, setNewAdmin] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'regen.ecocredit.v1.MsgUpdateClassAdmin',
      admin: wallet ? wallet.bech32Address : admin,
      classId: classId,
      newAdmin: newAdmin,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/regen.ecocredit.v1.MsgUpdateClassAdmin',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [admin, classId, newAdmin, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-update-class-admin-admin"
          label="admin"
          long={true}
          network={network}
          address={admin}
          setAddress={setAdmin}
        />
      )}
      <InputString
        id="msg-update-class-admin-class-id"
        label="class id"
        placeholder="C01"
        string={classId}
        setString={setClassId}
      />
      <InputAddress
        id="msg-update-class-admin-new-admin"
        label="new admin"
        network={network}
        address={newAdmin}
        setAddress={setNewAdmin}
      />
    </>
  )
}

export default MsgUpdateClassAdmin
