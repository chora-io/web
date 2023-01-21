import * as React from "react"
import { useEffect, useState } from "react"

import { MsgUpdateGroupPolicyAdmin } from "../../api/cosmos/group/v1/tx"

import InputAddress from "../InputAddress"

const MsgUpdateGroupPolicyAdminInputs = ({ network, setMessage }: any) => {

  const [admin, setAdmin] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [newAdmin, setNewAdmin] = useState<string>("")

  useEffect(() => {

    const msg = {
        $type: "cosmos.group.v1.MsgUpdateGroupPolicyAdmin",
        admin: admin,
        groupPolicyAddress: address,
        newAdmin: newAdmin,
    } as MsgUpdateGroupPolicyAdmin

    const msgAny = {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyAdmin",
        value: MsgUpdateGroupPolicyAdmin.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [admin, address, newAdmin])

  return (
    <>
      <InputAddress
        id="msg-update-group-policy-admin-admin"
        label="policy admin"
        long={true}
        network={network}
        address={admin}
        setAddress={setAdmin}
      />
      <InputAddress
        id="msg-update-group-policy-admin-address"
        label="policy address"
        long={true}
        network={network}
        address={address}
        setAddress={setAddress}
      />
      <InputAddress
        id="msg-update-group-policy-admin-new-admin"
        label="new policy admin"
        long={true}
        network={network}
        address={newAdmin}
        setAddress={setNewAdmin}
      />
    </>
  )
}

export default MsgUpdateGroupPolicyAdminInputs
