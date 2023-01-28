import * as React from "react"
import { useEffect, useState } from "react"
import * as Long from "long"

import { MsgUpdateGroupMembers as Msg } from "../../api/cosmos/group/v1/tx"

import InputAddress from "../InputAddress"
import InputMembers from "../InputMembers"
import InputNumber from "../InputNumber"

const MsgUpdateGroupMembers = ({ network, setMessage, useWallet, wallet }: any) => {

  const [admin, setAdmin] = useState<string>("")
  const [groupId, setGroupId] = useState<string>("")
  const [members, setMembers] = useState<any[]>([])

  useEffect(() => {

    const msg = {
      admin: wallet ? wallet.bech32Address : admin,
      groupId: Long.fromString(groupId || "0"),
      memberUpdates: members,
    } as Msg

    const msgAny = {
      typeUrl: "/cosmos.group.v1.MsgUpdateGroupMembers",
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [admin, groupId, members, wallet])

  return (
    <>
      <InputNumber
        id="msg-update-group-members-group-id"
        label="group id"
        number={groupId}
        setNumber={setGroupId}
      />
      {!useWallet &&
        <InputAddress
          id="msg-update-group-members-admin"
          label="admin"
          long={true}
          network={network}
          address={admin}
          setAddress={setAdmin}
        />
      }
      <InputMembers
        id="msg-update-group-members-members"
        network={network}
        members={members}
        setMembers={setMembers}
      />
    </>
  )
}

export default MsgUpdateGroupMembers
