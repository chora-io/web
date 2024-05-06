import { MsgCreateGroupWithPolicy as Msg } from 'cosmos/api/cosmos/group/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputIRI, SelectBoolean } from '..'
import { InputMembers, InputPolicy } from '.'

const MsgCreateGroupWithPolicy = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [admin, setAdmin] = useState<string>('')
  const [metadata, setMetadata] = useState<string>('')
  const [members, setMembers] = useState<any[]>([])
  const [policyAsAdmin, setPolicyAsAdmin] = useState<string>('')
  const [policyMetadata, setPolicyMetadata] = useState<string>('')
  const [decisionPolicy, setDecisionPolicy] = useState<any>(undefined)

  useEffect(() => {
    const msg: Msg = {
      $type: 'cosmos.group.v1.MsgCreateGroupWithPolicy',
      admin: wallet ? wallet.bech32Address : admin,
      members: members,
      groupMetadata: metadata,
      groupPolicyMetadata: policyMetadata,
      groupPolicyAsAdmin: policyAsAdmin === 'true',
      decisionPolicy: decisionPolicy,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/cosmos.group.v1.MsgCreateGroupWithPolicy',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [
    admin,
    members,
    metadata,
    policyMetadata,
    policyAsAdmin,
    decisionPolicy,
    wallet,
  ])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-create-group-with-policy-admin"
          label="admin"
          long={true}
          network={network}
          address={admin}
          setAddress={setAdmin}
        />
      )}
      <InputIRI
        id="msg-create-group-with-policy-metadata"
        label="metadata"
        network={network}
        iri={metadata}
        setIri={setMetadata}
      />
      <InputMembers
        id="msg-create-group-with-policy-members"
        network={network}
        members={members}
        setMembers={setMembers}
      />
      <SelectBoolean
        id="msg-create-group-with-policy-policy-as-admin"
        label="policy as admin"
        boolean={policyAsAdmin}
        setBoolean={setPolicyAsAdmin}
      />
      <InputIRI
        id="msg-create-group-with-policy-policy-metadata"
        label="policy metadata"
        network={network}
        iri={policyMetadata}
        setIri={setPolicyMetadata}
      />
      <InputPolicy
        id="msg-create-group-with-policy-decision-policy"
        label="decision policy"
        setPolicy={setDecisionPolicy}
      />
    </>
  )
}

export default MsgCreateGroupWithPolicy
