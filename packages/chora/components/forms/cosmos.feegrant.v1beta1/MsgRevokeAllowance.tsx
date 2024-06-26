import { MsgRevokeAllowance as Msg } from 'cosmos/api/cosmos/feegrant/v1beta1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress } from '..'

const MsgRevokeAllowance = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [granter, setGranter] = useState<string>('')
  const [grantee, setGrantee] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'cosmos.feegrant.v1beta1.MsgRevokeAllowance',
      granter: wallet ? wallet.bech32Address : granter,
      grantee: grantee,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/cosmos.feegrant.v1beta1.MsgRevokeAllowance',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [granter, grantee, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-revoke-allowance-granter"
          label="granter"
          long={true}
          network={network}
          address={granter}
          setAddress={setGranter}
        />
      )}
      <InputAddress
        id="msg-revoke-allowance-grantee"
        label="grantee"
        network={network}
        address={grantee}
        setAddress={setGrantee}
      />
    </>
  )
}

export default MsgRevokeAllowance
