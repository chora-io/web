import * as React from 'react'
import { useEffect, useState } from 'react'
import * as Long from 'long'

import { MsgCreateGroupPolicy as Msg } from 'cosmos/api/cosmos/group/v1/tx'

import InputAddress from '../InputAddress'
import InputIRI from '../InputIRI'
import InputNumber from '../InputNumber'
import InputPolicy from './InputPolicy'

const MsgCreateGroupPolicy = ({
  network,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [admin, setAdmin] = useState<string>('')
  const [groupId, setGroupId] = useState<string>('')
  const [metadata, setMetadata] = useState<string>('')
  const [decisionPolicy, setDecisionPolicy] = useState<any>(undefined)

  useEffect(() => {
    const msg = {
      admin: wallet ? wallet.bech32Address : admin,
      groupId: Long.fromString(groupId || '0'),
      metadata: metadata,
      decisionPolicy: decisionPolicy,
    } as unknown as Msg

    const msgAny = {
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
        network={network}
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
