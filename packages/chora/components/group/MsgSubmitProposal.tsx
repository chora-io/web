import * as React from 'react'
import { useEffect, useState } from 'react'

import { MsgSubmitProposal as Msg } from '../../api/cosmos/group/v1/tx'
import { execFromJSON } from 'chora/api/cosmos/group/v1/types'

import InputAddress from '../InputAddress'
import InputIRI from '../InputIRI'
import SelectExecution from './SelectExecution'
import SelectMessage from '../SelectMessage'

const MsgSubmitProposal = ({ network, setMessage, useWallet, wallet }: any) => {
  const [proposer, setProposer] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [metadata, setMetadata] = useState<string>('')
  const [propMessage, setPropMessage] = useState<any>(undefined)
  const [execution, setExecution] = useState<string>('')

  useEffect(() => {
    const msg = {
      $type: 'cosmos.group.v1.MsgSubmitProposal',
      proposers: wallet ? [wallet.bech32Address] : [proposer],
      groupPolicyAddress: address,
      metadata: metadata,
      messages: propMessage ? [propMessage] : [],
      exec: execFromJSON(execution),
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/cosmos.group.v1.MsgSubmitProposal',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [proposer, address, metadata, propMessage, execution, wallet])

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
      <SelectMessage
        id="msg-submit-proposal-message"
        label="message"
        network={network}
        message={propMessage}
        setMessage={setPropMessage}
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
