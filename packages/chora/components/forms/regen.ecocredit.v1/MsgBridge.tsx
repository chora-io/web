import { MsgBridge as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputCredits } from '.'
import { InputAddress, InputString } from '..'

const MsgBridge = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [owner, setOwner] = useState<string>('')
  const [target, setTarget] = useState<string>('')
  const [recipient, setRecipient] = useState<string>('')
  const [credits, setCredits] = useState<any[]>([])

  useEffect(() => {
    const msg: Msg = {
      $type: 'regen.ecocredit.v1.MsgBridge',
      owner: wallet ? wallet.bech32Address : owner,
      target: target,
      recipient: recipient,
      credits: credits,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/regen.ecocredit.v1.MsgBridge',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [owner, credits, target, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-bridge-owner"
          label="owner"
          long={true}
          network={network}
          address={owner}
          setAddress={setOwner}
        />
      )}
      <InputString
        id="msg-bridge-target"
        label="target"
        placeholder="polygon"
        string={target}
        setString={setTarget}
      />
      <InputAddress
        id="msg-bridge-recipient"
        label="recipient"
        placeholder="0x0"
        address={recipient}
        setAddress={setRecipient}
      />
      <InputCredits
        id="msg-bridge-credits"
        label="credits"
        credits={credits}
        setCredits={setCredits}
      />
    </>
  )
}

export default MsgBridge
