import { MsgGrant as Msg } from 'cosmos/api/cosmos/authz/v1beta1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress } from '..'
import { InputGrant } from '.'

const MsgGrant = ({ network, message, setMessage, useWallet, wallet }: any) => {
  const [granter, setGranter] = useState<string>('')
  const [grantee, setGrantee] = useState<string>('')
  const [grant, setGrant] = useState<any>(undefined)

  useEffect(() => {
    const msg: Msg = {
      $type: 'cosmos.authz.v1beta1.MsgGrant',
      granter: wallet ? wallet.bech32Address : granter,
      grantee: grantee,
      grant: grant,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/cosmos.authz.v1beta1.MsgGrant',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [granter, grantee, grant, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-grant-granter"
          label="granter"
          long={true}
          network={network}
          address={granter}
          setAddress={setGranter}
        />
      )}
      <InputAddress
        id="msg-grant-grantee"
        label="grantee"
        network={network}
        address={grantee}
        setAddress={setGrantee}
      />
      <InputGrant
        id="msg-grant-grant"
        label="grant"
        network={network}
        setGrant={setGrant}
      />
    </>
  )
}

export default MsgGrant
