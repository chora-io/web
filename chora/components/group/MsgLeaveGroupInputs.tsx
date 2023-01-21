import * as React from "react"
import { useEffect, useState } from "react"
import * as Long from "long"

import { MsgLeaveGroup } from "../../api/cosmos/group/v1/tx"

import InputAddress from "../InputAddress"
import InputNumber from "../InputNumber"

const MsgLeaveGroupInputs = ({ network, setMessage }: any) => {

  const [address, setAdmin] = useState<string>("")
  const [groupId, setGroupId] = useState<string>("")

  useEffect(() => {

    const msg = {
        $type: "cosmos.group.v1.MsgLeaveGroup",
        address: address,
        groupId: Long.fromString(groupId || "0"),
    } as MsgLeaveGroup

    const msgAny = {
        typeUrl: "/cosmos.group.v1.MsgLeaveGroup",
        value: MsgLeaveGroup.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [address, groupId])

  return (
    <>
      <InputAddress
        id="msg-leave-group-address"
        label="address"
        network={network}
        address={address}
        setAddress={setAdmin}
      />
      <InputNumber
        id="msg-leave-group-group-id"
        label="group id"
        number={groupId}
        setNumber={setGroupId}
      />
    </>
  )
}

export default MsgLeaveGroupInputs
