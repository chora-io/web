import * as React from "react"
import { useEffect, useState } from "react"

import { MsgUpdateGroupPolicyDecisionPolicy as Msg } from "../../api/cosmos/group/v1/tx"

import InputAddress from "../InputAddress"
import InputPolicy from "../InputPolicy"

const MsgUpdateGroupPolicyDecisionPolicy = ({ network, setMessage, useWallet, wallet }: any) => {

  // group inputs
  const [admin, setAdmin] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [policy, setPolicy] = useState<any>(undefined)

  useEffect(() => {

    const msg = {
      admin: wallet ? wallet.bech32Address : admin,
      groupPolicyAddress: address,
      decisionPolicy: policy,
    } as Msg

    const msgAny = {
      typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy",
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [admin, address, policy, wallet])

  return (
    <>
      <InputAddress
        id="msg-update-group-policy-decision-policy-address"
        label="policy address"
        long={true}
        network={network}
        address={address}
        setAddress={setAddress}
      />
      {!useWallet &&
        <InputAddress
          id="msg-update-group-policy-decision-policy-admin"
          label="policy admin"
          long={true}
          network={network}
          address={admin}
          setAddress={setAdmin}
        />
      }
      <InputPolicy
        id="msg-update-group-policy-decision-policy-decision-policy"
        label="decision policy"
        setPolicy={setPolicy}
      />
    </>
  )
}

export default MsgUpdateGroupPolicyDecisionPolicy
