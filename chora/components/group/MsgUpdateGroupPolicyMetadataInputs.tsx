import * as React from "react"
import { useEffect, useState } from "react"

import { MsgUpdateGroupPolicyMetadata } from "../../api/cosmos/group/v1/tx"

import InputAddress from "../InputAddress"
import InputIRI from "../InputIRI"

const MsgUpdateGroupPolicyMetadataInputs = ({ network, setMessage }: any) => {

  const [admin, setAdmin] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [metadata, setMetadata] = useState<string>("")

  useEffect(() => {

    const msg = {
        $type: "cosmos.group.v1.MsgUpdateGroupPolicyMetadata",
        admin: admin,
        groupPolicyAddress: address,
        metadata: metadata,
    } as MsgUpdateGroupPolicyMetadata

    const msgAny = {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyMetadata",
        value: MsgUpdateGroupPolicyMetadata.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [admin, address, metadata])

  return (
    <>
      <InputAddress
        id="msg-update-group-policy-metadata-admin"
        label="policy admin"
        long={true}
        network={network}
        address={admin}
        setAddress={setAdmin}
      />
      <InputAddress
        id="msg-update-group-policy-metadata-address"
        label="policy address"
        long={true}
        network={network}
        address={address}
        setAddress={setAddress}
      />
      <InputIRI
        id="msg-update-group-policy-metadata-metadata"
        label="metadata"
        network={network}
        address={metadata}
        setAddress={setMetadata}
      />
    </>
  )
}

export default MsgUpdateGroupPolicyMetadataInputs
