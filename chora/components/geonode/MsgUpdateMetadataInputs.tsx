import * as React from "react"
import { useEffect, useState } from "react"
import * as Long from "long"

import { MsgUpdateMetadata } from "../../api/chora/geonode/v1/msg"

import InputAddress from "../InputAddress"
import InputIRI from "../InputIRI"
import InputNumber from "../InputNumber"

const MsgUpdateMetadataInputs = ({ network, setMessage }: any) => {

  const [id, setId] = useState<string>("")
  const [curator, setCurator] = useState<string>("")
  const [newMetadata, setMetadata] = useState<string>("")

  useEffect(() => {

    const msg = {
        $type: "chora.geonode.v1.MsgUpdateMetadata",
        id: Long.fromString(id || "0"),
        curator: curator,
        newMetadata: newMetadata,
    } as MsgUpdateMetadata

    const msgAny = {
        typeUrl: "/chora.geonode.v1.MsgUpdateMetadata",
        value: MsgUpdateMetadata.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [id, curator, newMetadata])

  return (
    <>
      <InputNumber
        id="msg-update-metadata-id"
        label="id"
        network={network}
        number={id}
        setNumber={setId}
      />
      <InputAddress
        id="msg-update-metadata-curator"
        label="curator"
        long={true}
        network={network}
        address={curator}
        setAddress={setCurator}
      />
      <InputIRI
        id="msg-update-metadata-new-metadata"
        label="new metadata"
        iri={newMetadata}
        setIri={setMetadata}
      />
    </>
  )
}

export default MsgUpdateMetadataInputs
