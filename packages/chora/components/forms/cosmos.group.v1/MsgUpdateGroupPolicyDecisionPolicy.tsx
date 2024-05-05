import { MsgUpdateGroupPolicyDecisionPolicy as Msg } from 'cosmos/api/cosmos/group/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress } from '..'
import { InputPolicy } from '.'

const MsgUpdateGroupPolicyDecisionPolicy = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [admin, setAdmin] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [policy, setPolicy] = useState<any>(undefined)

  useEffect(() => {
    const msg: Msg = {
      $type: 'cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy',
      admin: wallet ? wallet.bech32Address : admin,
      groupPolicyAddress: address,
      decisionPolicy: policy,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy',
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
      {!useWallet && (
        <InputAddress
          id="msg-update-group-policy-decision-policy-admin"
          label="policy admin"
          long={true}
          network={network}
          address={admin}
          setAddress={setAdmin}
        />
      )}
      <InputPolicy
        id="msg-update-group-policy-decision-policy-decision-policy"
        label="decision policy"
        setPolicy={setPolicy}
      />
    </>
  )
}

export default MsgUpdateGroupPolicyDecisionPolicy
