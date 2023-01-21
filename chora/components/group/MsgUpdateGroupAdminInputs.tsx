import * as React from "react"
import { useEffect, useState } from "react"
import * as Long from "long"

import { MsgUpdateGroupAdmin } from "../../api/cosmos/group/v1/tx"

import InputAddress from "../InputAddress"
import InputNumber from "../InputNumber"

const MsgUpdateGroupAdminInputs = ({ network, setMessage }: any) => {

  const [admin, setAdmin] = useState<string>("")
  const [groupId, setGroupId] = useState<string>("")
  const [newAdmin, setNewAdmin] = useState<string>("")

  useEffect(() => {

    const msg = {
        $type: "cosmos.group.v1.MsgUpdateGroupAdmin",
        admin: admin,
        groupId: Long.fromString(groupId || "0"),
        newAdmin: newAdmin,
    } as MsgUpdateGroupAdmin

    const msgAny = {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupAdmin",
        value: MsgUpdateGroupAdmin.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [admin, groupId, newAdmin])

  return (
    <>
      <InputAddress
        id="msg-update-group-admin-admin"
        label="admin"
        long={true}
        network={network}
        address={admin}
        setAddress={setAdmin}
      />
      <InputNumber
        id="msg-update-group-admin-group-id"
        label="group id"
        number={groupId}
        setNumber={setGroupId}
      />
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

export default MsgUpdateGroupAdminInputs
