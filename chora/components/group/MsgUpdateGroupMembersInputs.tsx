import * as React from "react"
import { useEffect, useState } from "react"
import * as Long from "long"

import { MsgUpdateGroupMembers } from "../../api/cosmos/group/v1/tx"

import InputAddress from "../InputAddress"
import InputMembers from "../InputMembers"
import InputNumber from "../InputNumber"

const MsgUpdateGroupMembersInputs = ({ network, setMessage }: any) => {

  const [admin, setAdmin] = useState<string>("")
  const [groupId, setGroupId] = useState<string>("")
  const [updates, setUpdates] = useState<string>("")

  useEffect(() => {

    const msg = {
        $type: "cosmos.group.v1.MsgUpdateGroupMembers",
        admin: admin,
        groupId: Long.fromString(groupId || "0"),
        memberUpdates: updates,
    } as MsgUpdateGroupMembers

    const msgAny = {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupMembers",
        value: MsgUpdateGroupMembers.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [admin, groupId, updates])

  return (
    <>
      <InputAddress
        id="msg-update-group-members-admin"
        label="admin"
        long={true}
        network={network}
        address={admin}
        setAddress={setAdmin}
      />
      <InputNumber
        id="msg-update-group-members-group-id"
        label="group id"
        number={groupId}
        setNumber={setGroupId}
      />
      <InputMembers
        id="msg-update-group-members-members"
        network={network}
        members={updates}
        setMembers={setUpdates}
      />
    </>
  )
}

export default MsgUpdateGroupMembersInputs
