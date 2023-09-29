import * as React from 'react'
import { useEffect, useState } from 'react'

import { MsgCancel as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'

import InputAddress from '../InputAddress'
import InputIRI from '../InputIRI'
import InputString from '../InputString'

const MsgCancel = ({ network, setMessage, useWallet, wallet }: any) => {
  const [owner, setOwner] = useState<string>('')
  const [credits, setCredits] = useState<string>('')
  const [reason, setReason] = useState<string>('')

  useEffect(() => {
    const msg = {
      owner: wallet ? wallet.bech32Address : owner,
      credits: [], // TODO
      reason: reason,
    } as unknown as Msg

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
      <InputString
        id="msg-cancel-credits"
        label="credits"
        placeholder="[ not implemented ]"
        string={credits}
        setString={setCredits}
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
