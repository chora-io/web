import { MsgCreateGroupPolicy as Msg } from 'cosmos/api/cosmos/group/v1/tx'
import * as Long from 'long'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputIRI, InputNumber } from '..'
import { InputPolicy } from '.'

const MsgCreateGroupPolicy = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [admin, setAdmin] = useState<string>('')
  const [groupId, setGroupId] = useState<string>('')
  const [metadata, setMetadata] = useState<string>('')
  const [decisionPolicy, setDecisionPolicy] = useState<any>(undefined)

  useEffect(() => {
    const msg: Msg = {
      $type: 'cosmos.group.v1.MsgCreateGroupPolicy',
      admin: wallet ? wallet.bech32Address : admin,
      groupId: Long.fromString(groupId || '0'),
      metadata: metadata,
      decisionPolicy: decisionPolicy,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/cosmos.group.v1.MsgCreateGroupPolicy',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [admin, groupId, metadata, decisionPolicy, wallet])

  return (
    <>
      <InputNumber
        id="msg-create-group-policy-group-id"
        label="group id"
        number={groupId}
        setNumber={setGroupId}
      />
      {!useWallet && (
        <InputAddress
          id="msg-create-group-policy-admin"
          label="policy admin"
          long={true}
          network={network}
          address={admin}
          setAddress={setAdmin}
        />
      )}
      <InputIRI
        id="msg-create-group-policy-metadata"
        label="policy metadata"
        network={network}
        iri={metadata}
        setIri={setMetadata}
      />
      <InputPolicy
        id="msg-create-group-policy-decision-policy"
        label="decision policy"
        setPolicy={setDecisionPolicy}
      />
    </>
  )
}

export default MsgCreateGroupPolicy
