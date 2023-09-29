import * as React from 'react'
import { useEffect, useState } from 'react'

import { MsgSend as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'

import InputAddress from '../InputAddress'
import InputString from '../InputString'

const MsgSend = ({ network, setMessage, useWallet, wallet }: any) => {
  const [sender, setSender] = useState<string>('')
  const [recipient, setRecipient] = useState<string>('')
  const [credits, setCredits] = useState<string>('')

  useEffect(() => {
    const msg = {
      sender: wallet ? wallet.bech32Address : sender,
      recipient: recipient,
      credits: [], // TODO
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/regen.ecocredit.v1.MsgSend',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [sender, recipient, credits, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-send-sender"
          label="sender"
          long={true}
          network={network}
          address={sender}
          setAddress={setSender}
        />
      )}
      <InputAddress
        id="msg-send-recipient"
        label="recipient"
        network={network}
        address={recipient}
        setAddress={setRecipient}
      />
      <InputString
        id="msg-send-credits"
        label="credits"
        placeholder="[ not implemented ]"
        string={credits}
        setString={setCredits}
      />
    </>
  )
}

export default MsgSend
