import * as React from "react"
import { useEffect, useState } from "react"

import { MsgUpdateGroupPolicyDecisionPolicy } from "../../api/cosmos/group/v1/tx"

import InputAddress from "../InputAddress"
import InputPolicy from "../InputPolicy"

const MsgUpdateGroupPolicyDecisionPolicyInputs = ({ network, setMessage }: any) => {

  // group inputs
  const [admin, setAdmin] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [policy, setPolicy] = useState<any>(undefined)

  useEffect(() => {

    const msg = {
        $type: "cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy",
        admin: admin,
        groupPolicyAddress: address,
        decisionPolicy: policy,
    } as MsgUpdateGroupPolicyDecisionPolicy

    const msgAny = {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy",
        value: MsgUpdateGroupPolicyDecisionPolicy.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [admin, address, policy])

  return (
    <>
      <InputAddress
        id="msg-update-group-policy-decision-policy-admin"
        label="admin"
        long={true}
        network={network}
        address={admin}
        setAddress={setAdmin}
      />
      <InputAddress
        id="msg-update-group-policy-decision-policy-address"
        label="admin"
        long={true}
        network={network}
        address={address}
        setAddress={setAddress}
      />
      <InputPolicy
        id="msg-update-group-policy-decision-policy-decision-policy"
        label="decision policy"
        setPolicy={setPolicy}
      />
    </>
  )
}

export default MsgUpdateGroupPolicyDecisionPolicyInputs
