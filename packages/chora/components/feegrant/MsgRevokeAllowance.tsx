import * as React from 'react'
import { useEffect, useState } from 'react'

import { MsgRevokeAllowance as Msg } from 'cosmos/api/cosmos/feegrant/v1beta1/tx'

import InputAddress from '../InputAddress'

const MsgRevokeAllowance = ({
  network,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [granter, setGranter] = useState<string>('')
  const [grantee, setGrantee] = useState<string>('')

  useEffect(() => {
    const msg = {
      granter: wallet ? wallet.bech32Address : granter,
      grantee: grantee,
    } as unknown as Msg

    const msgAny = {
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
