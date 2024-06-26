import { execFromJSON, MsgVote as Msg } from 'cosmos/api/cosmos/group/v1/tx'
import { voteOptionFromJSON } from 'cosmos/api/cosmos/group/v1/types'
import * as Long from 'long'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputIRI, InputNumber } from '..'
import { SelectExecution, SelectVote } from '.'

const MsgVote = ({ network, message, setMessage, useWallet, wallet }: any) => {
  const [voter, setVoter] = useState<string>('')
  const [proposalId, setProposalId] = useState<string>('')
  const [option, setOption] = useState<string>('')
  const [metadata, setMetadata] = useState<string>('')
  const [execution, setExecution] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'cosmos.group.v1.MsgVote',
      voter: wallet ? wallet.bech32Address : voter,
      proposalId: Long.fromString(proposalId || '0'),
      option: voteOptionFromJSON(option),
      metadata: metadata,
      exec: execFromJSON(execution),
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/cosmos.group.v1.MsgVote',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [voter, proposalId, option, metadata, execution, wallet])

  return (
    <>
      <InputNumber
        id="msg-vote-proposal-id"
        label="proposal id"
        number={proposalId}
        setNumber={setProposalId}
      />
      {!useWallet && (
        <InputAddress
          id="msg-vote-voter"
          label="voter"
          long={true}
          network={network}
          address={voter}
          setAddress={setVoter}
        />
      )}
      <SelectVote
        id="msg-vote-option"
        label="vote option"
        vote={option}
        setVote={setOption}
      />
      <InputIRI
        id="msg-vote-metadata"
        label="vote metadata"
        iri={metadata}
        setIri={setMetadata}
      />
      <SelectExecution
        id="msg-vote-execution"
        label="proposal execution"
        execution={execution}
        setExecution={setExecution}
      />
    </>
  )
}

export default MsgVote
