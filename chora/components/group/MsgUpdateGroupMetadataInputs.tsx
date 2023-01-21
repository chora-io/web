import * as React from "react"
import { useEffect, useState } from "react"
import * as Long from "long"

import { MsgUpdateGroupMetadata } from "../../api/cosmos/group/v1/tx"

import InputAddress from "../InputAddress"
import InputIRI from "../InputIRI"
import InputNumber from "../InputNumber"

const MsgUpdateGroupMetadataInputs = ({ network, setMessage }: any) => {

  const [admin, setAdmin] = useState<string>("")
  const [groupId, setGroupId] = useState<string>("")
  const [metadata, setMetadata] = useState<string>("")

  useEffect(() => {

    const msg = {
        $type: "cosmos.group.v1.MsgUpdateGroupMetadata",
        admin: admin,
        groupId: Long.fromString(groupId || "0"),
        metadata: metadata,
    } as MsgUpdateGroupMetadata

    const msgAny = {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupMetadata",
        value: MsgUpdateGroupMetadata.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [admin, groupId, metadata])

  return (
    <>
      <InputAddress
        id="msg-update-group-admin-admin"
        label="admin"
        long={true}
        network={network}
        address={admin}
        setAddress={setAdmin}
      />
      <InputNumber
        id="msg-update-group-admin-group-id"
        label="group id"
        number={groupId}
        setNumber={setGroupId}
      />
      <InputIRI
        id="msg-update-group-admin-metadata"
        label="metadata"
        network={network}
        address={metadata}
        setAddress={setMetadata}
      />
    </>
  )
}

export default MsgUpdateGroupMetadataInputs
