import { MsgSetSendEnabled as Msg } from 'cosmos/api/cosmos/bank/v1beta1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputString } from '..'

const MsgSetSendEnabled = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [authority, setAuthority] = useState<string>('')
  const [sendEnabled, setSendEnabled] = useState<string>('')
  const [useDefaultFor, setUseDefaultFor] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'cosmos.bank.v1beta1.MsgSetSendEnabled',
      authority: wallet ? wallet.bech32Address : authority,
      sendEnabled: [], // TODO
      useDefaultFor: [], // TODO
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/cosmos.bank.v1beta1.MsgSetSendEnabled',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [authority, sendEnabled, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-set-send-enabled-authority"
          label="authority"
          long={true}
          network={network}
          address={authority}
          setAddress={setAuthority}
        />
      )}
      <InputString
        id="msg-set-send-enabled-send-enabled"
        label="send enabled"
        placeholder="[ not implemented ]"
        boolean={sendEnabled}
        setBoolean={setSendEnabled}
      />
      <InputString
        id="msg-set-send-enabled-use-default-for"
        label="use default for"
        placeholder="[ not implemented ]"
        boolean={useDefaultFor}
        setBoolean={setUseDefaultFor}
      />
    </>
  )
}

export default MsgSetSendEnabled
