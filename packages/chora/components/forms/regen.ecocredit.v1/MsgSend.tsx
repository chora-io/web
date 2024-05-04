import { MsgSend as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress } from '..'
import { InputSendCredits } from '.'

const MsgSend = ({ network, setMessage, useWallet, wallet }: any) => {
  const [sender, setSender] = useState<string>('')
  const [recipient, setRecipient] = useState<string>('')
  const [credits, setCredits] = useState<any[]>([])

  useEffect(() => {
    const msg: Msg = {
      $type: 'regen.ecocredit.v1.MsgSend',
      sender: wallet ? wallet.bech32Address : sender,
      recipient: recipient,
      credits: credits,
    }

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
      <InputSendCredits
        id="msg-send-credits"
        label="credits"
        credits={credits}
        setCredits={setCredits}
      />
    </>
  )
}

export default MsgSend
