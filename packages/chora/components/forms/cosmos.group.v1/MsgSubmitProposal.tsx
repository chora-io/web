import {
  execFromJSON,
  MsgSubmitProposal as Msg,
} from 'cosmos/api/cosmos/group/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputIRI, InputMessages } from '..'
import { SelectExecution } from '.'

const MsgSubmitProposal = ({ network, setMessage, useWallet, wallet }: any) => {
  const [proposer, setProposer] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [metadata, setMetadata] = useState<string>('')
  const [messages, setMessages] = useState<any[]>([])
  const [execution, setExecution] = useState<string>('')

  useEffect(() => {
    const msg = {
      $type: 'cosmos.group.v1.MsgSubmitProposal',
      proposers: wallet ? [wallet.bech32Address] : [proposer],
      groupPolicyAddress: address,
      metadata: metadata,
      messages: messages,
      exec: execFromJSON(execution),
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/cosmos.group.v1.MsgSubmitProposal',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [proposer, address, metadata, messages, execution, wallet])

  return (
    <>
      <InputAddress
        id="msg-submit-proposal-address"
        label="policy address"
        long={true}
        network={network}
        address={address}
        setAddress={setAddress}
      />
      {!useWallet && (
        <InputAddress
          id="msg-submit-proposal-proposer"
          label="proposer"
          long={true}
          network={network}
          address={proposer}
          setAddress={setProposer}
        />
      )}
      <InputIRI
        id="msg-submit-proposal-metadata"
        label="metadata"
        iri={metadata}
        setIri={setMetadata}
      />
      <InputMessages
        id="msg-submit-proposal-messages"
        label="messages"
        network={network}
        messages={messages}
        setMessages={setMessages}
      />
      <SelectExecution
        id="msg-submit-proposal-execution"
        label="execution"
        execution={execution}
        setExecution={setExecution}
      />
    </>
  )
}

export default MsgSubmitProposal
