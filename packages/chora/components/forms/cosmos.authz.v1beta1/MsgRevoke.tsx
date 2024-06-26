import { MsgRevoke as Msg } from 'cosmos/api/cosmos/authz/v1beta1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, SelectMessage } from '..'

const MsgRevoke = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [granter, setGranter] = useState<string>('')
  const [grantee, setGrantee] = useState<string>('')
  const [revokeMessage, setRevokeMessage] = useState<any>(undefined)

  useEffect(() => {
    const msg: Msg = {
      $type: 'cosmos.authz.v1beta1.MsgRevoke',
      granter: wallet ? wallet.bech32Address : granter,
      grantee: grantee,
      msgTypeUrl: revokeMessage ? revokeMessage.typeUrl : '',
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/cosmos.authz.v1beta1.MsgRevoke',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [granter, grantee, revokeMessage, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-revoke-granter"
          label="granter"
          long={true}
          network={network}
          address={granter}
          setAddress={setGranter}
        />
      )}
      <InputAddress
        id="msg-revoke-grantee"
        label="grantee"
        network={network}
        address={grantee}
        setAddress={setGrantee}
      />
      <SelectMessage
        id="msg-revoke-message"
        label="message"
        typeOnly={true}
        network={network}
        message={revokeMessage}
        setMessage={setRevokeMessage}
      />
    </>
  )
}

export default MsgRevoke
