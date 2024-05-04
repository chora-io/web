import { MsgUpdateProjectAdmin as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputString } from '..'

const MsgUpdateProjectAdmin = ({
  network,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [admin, setAdmin] = useState<string>('')
  const [projectId, setProjectId] = useState<string>('')
  const [newAdmin, setNewAdmin] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'regen.ecocredit.v1.MsgUpdateProjectAdmin',
      admin: wallet ? wallet.bech32Address : admin,
      projectId: projectId,
      newAdmin: newAdmin,
    }

    const msgAny = {
      typeUrl: '/regen.ecocredit.v1.MsgUpdateProjectAdmin',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [admin, projectId, newAdmin, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-update-project-admin-admin"
          label="admin"
          long={true}
          network={network}
          address={admin}
          setAddress={setAdmin}
        />
      )}
      <InputString
        id="msg-update-project-admin-project-id"
        label="project id"
        placeholder="C01"
        string={projectId}
        setString={setProjectId}
      />
      <InputAddress
        id="msg-update-project-admin-new-admin"
        label="new admin"
        network={network}
        address={newAdmin}
        setAddress={setNewAdmin}
      />
    </>
  )
}

export default MsgUpdateProjectAdmin
