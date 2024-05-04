import { MsgCancel as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputCredits } from '.'
import { InputAddress, InputIRI } from '..'

const MsgCancel = ({ network, setMessage, useWallet, wallet }: any) => {
  const [owner, setOwner] = useState<string>('')
  const [credits, setCredits] = useState<any[]>([])
  const [reason, setReason] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'regen.ecocredit.v1.MsgCancel',
      owner: wallet ? wallet.bech32Address : owner,
      credits: credits,
      reason: reason,
    }

    const msgAny = {
      typeUrl: '/regen.ecocredit.v1.MsgCancel',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [owner, credits, reason, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-cancel-owner"
          label="owner"
          long={true}
          network={network}
          address={owner}
          setAddress={setOwner}
        />
      )}
      <InputCredits
        id="msg-cancel-credits"
        label="credits"
        credits={credits}
        setCredits={setCredits}
      />
      <InputIRI
        id="msg-cancel-reason"
        label="reason"
        network={network}
        iri={reason}
        setIri={setReason}
      />
    </>
  )
}

export default MsgCancel
