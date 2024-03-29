import { MsgUpdateGroupPolicyAdmin as Msg } from 'cosmos/api/cosmos/group/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import InputAddress from '../InputAddress'

const MsgUpdateGroupPolicyAdmin = ({
  network,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [admin, setAdmin] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [newAdmin, setNewAdmin] = useState<string>('')

  useEffect(() => {
    const msg = {
      admin: wallet ? wallet.bech32Address : admin,
      groupPolicyAddress: address,
      newAdmin: newAdmin,
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/cosmos.group.v1.MsgUpdateGroupPolicyAdmin',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [admin, address, newAdmin, wallet])

  return (
    <>
      <InputAddress
        id="msg-update-group-policy-admin-address"
        label="policy address"
        long={true}
        network={network}
        address={address}
        setAddress={setAddress}
      />
      {!useWallet && (
        <InputAddress
          id="msg-update-group-policy-admin-admin"
          label="policy admin"
          long={true}
          network={network}
          address={admin}
          setAddress={setAdmin}
        />
      )}
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

export default MsgUpdateGroupPolicyAdmin
