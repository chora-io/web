import * as React from "react"
import { useEffect, useState } from "react"

import { MsgCreateGroup } from "../../api/cosmos/group/v1/tx"

import InputAddress from "../InputAddress"
import InputIRI from "../InputIRI"
import InputMembers from "../InputMembers"

const MsgCreateGroupInputs = ({ network, setMessage }: any) => {

  const [admin, setAdmin] = useState<string>("")
  const [metadata, setMetadata] = useState<string>("")
  const [members, setMembers] = useState<any[]>([])

  useEffect(() => {

    const msg = {
        $type: "cosmos.group.v1.MsgCreateGroup",
        admin: admin,
        members: members,
        metadata: metadata,
    } as MsgCreateGroup

    const msgAny = {
        typeUrl: "/cosmos.group.v1.MsgCreateGroup",
        value: MsgCreateGroup.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [admin, members, metadata])

  return (
    <>
      <InputAddress
        id="msg-create-group-admin"
        label="admin"
        long={true}
        network={network}
        address={admin}
        setAddress={setAdmin}
      />
      <InputIRI
        id="msg-create-group-metadata"
        label="metadata"
        iri={metadata}
        setIri={setMetadata}
      />
      <InputMembers
        id="msg-create-group-members"
        network={network}
        members={members}
        setMembers={setMembers}
      />
    </>
  )
}

export default MsgCreateGroupInputs
