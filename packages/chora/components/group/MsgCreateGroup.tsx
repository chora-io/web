import * as React from "react"
import { useEffect, useState } from "react"

import { MsgCreateGroup as Msg } from "../../api/cosmos/group/v1/tx"

import InputAddress from "../InputAddress"
import InputIRI from "../InputIRI"
import InputMembers from "./InputMembers"

const MsgCreateGroup = ({ network, setMessage, useWallet, wallet }: any) => {
  const [admin, setAdmin] = useState<string>("")
  const [metadata, setMetadata] = useState<string>("")
  const [members, setMembers] = useState<any[]>([])

  useEffect(() => {
    const msg = {
      admin: wallet ? wallet.bech32Address : admin,
      members: members,
      metadata: metadata,
    } as unknown as Msg

    const msgAny = {
      typeUrl: "/cosmos.group.v1.MsgCreateGroup",
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [admin, members, metadata, wallet])

  return (
    <>
      {!useWallet &&
        <InputAddress
          id="msg-create-group-admin"
          label="admin"
          long={true}
          network={network}
          address={admin}
          setAddress={setAdmin}
        />
      }
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

export default MsgCreateGroup
