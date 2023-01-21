import * as React from "react"
import { useEffect, useState } from "react"

import { MsgCreateGroupPolicy } from "../../api/cosmos/group/v1/tx"

import InputAddress from "../InputAddress"
import InputIRI from "../InputIRI"
import InputNumber from "../InputNumber"
import InputPolicy from "../InputPolicy"

const MsgCreateGroupPolicyInputs = ({ network, setMessage }: any) => {

  // group inputs
  const [admin, setAdmin] = useState<string>("")
  const [groupId, setGroupId] = useState<string>("")
  const [metadata, setMetadata] = useState<string>("")
  const [decisionPolicy, setDecisionPolicy] = useState<any>(undefined)

  useEffect(() => {

    const msg = {
        $type: "cosmos.group.v1.MsgCreateGroupPolicy",
        admin: admin,
        groupId: groupId,
        metadata: metadata,
        decisionPolicy: decisionPolicy,
    } as MsgCreateGroupPolicy

    const msgAny = {
        typeUrl: "/cosmos.group.v1.MsgCreateGroupPolicy",
        value: MsgCreateGroupPolicy.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [admin, groupId, metadata, decisionPolicy])

  return (
    <>
      <InputAddress
        id="msg-create-group-policy-admin"
        label="admin"
        long={true}
        network={network}
        address={admin}
        setAddress={setAdmin}
      />
      <InputNumber
        id="msg-create-group-policy-group-id"
        network={network}
        number={groupId}
        setNumber={setGroupId}
      />
      <InputIRI
        id="msg-create-group-policy-metadata"
        label="metadata"
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

export default MsgCreateGroupPolicyInputs
