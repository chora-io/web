import { MsgExec as Msg } from 'cosmos/api/cosmos/authz/v1beta1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, SelectMessage } from '..'

const MsgExec = ({ network, message, setMessage, useWallet, wallet }: any) => {
  const [grantee, setGrantee] = useState<string>('')
  const [execMsg, setExecMsg] = useState<any>(undefined)

  useEffect(() => {
    const msg: Msg = {
      $type: 'cosmos.authz.v1beta1.MsgExec',
      grantee: wallet ? wallet.bech32Address : grantee,
      msgs: execMsg ? [execMsg] : [],
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/cosmos.authz.v1beta1.MsgExec',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [grantee, execMsg, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-exec-grantee"
          label="grantee"
          long={true}
          network={network}
          address={grantee}
          setAddress={setGrantee}
        />
      )}
      <SelectMessage
        id="msg-exec-message"
        label="message"
        network={network}
        setMessage={setExecMsg}
      />
    </>
  )
}

export default MsgExec
