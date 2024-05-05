import { MsgRetire as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputCredits } from '.'
import { InputAddress, InputIRI, InputString } from '..'

const MsgRetire = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [owner, setOwner] = useState<string>('')
  const [credits, setCredits] = useState<any[]>([])
  const [jurisdiction, setJurisdiction] = useState<string>('')
  const [reason, setReason] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'regen.ecocredit.v1.MsgRetire',
      owner: wallet ? wallet.bech32Address : owner,
      credits: credits,
      jurisdiction: jurisdiction,
      reason: reason,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/regen.ecocredit.v1.MsgRetire',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [owner, credits, reason, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-retire-owner"
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
      <InputString
        id="msg-retire-jurisdiction"
        label="jurisdiction"
        placeholder="US-WA"
        string={jurisdiction}
        setString={setJurisdiction}
      />
      <InputIRI
        id="msg-retire-reason"
        label="reason"
        network={network}
        iri={reason}
        setIri={setReason}
      />
    </>
  )
}

export default MsgRetire
