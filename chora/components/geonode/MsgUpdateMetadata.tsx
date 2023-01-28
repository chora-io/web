import * as React from "react"
import { useEffect, useState } from "react"
import * as Long from "long"

import { MsgUpdateMetadata as Msg } from "../../api/chora/geonode/v1/msg"

import InputAddress from "../InputAddress"
import InputIRI from "../InputIRI"
import InputNumber from "../InputNumber"

const MsgUpdateMetadata = ({ network, setMessage, useWallet, wallet }: any) => {

  const [id, setId] = useState<string>("")
  const [curator, setCurator] = useState<string>("")
  const [newMetadata, setMetadata] = useState<string>("")

  useEffect(() => {

    const msg = {
      id: Long.fromString(id || "0"),
      curator: wallet ? wallet.bech32Address : curator,
      newMetadata: newMetadata,
    } as Msg

    const msgAny = {
      typeUrl: "/chora.geonode.v1.MsgUpdateMetadata",
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [id, curator, newMetadata, wallet])

  return (
    <>
      <InputNumber
        id="msg-update-metadata-id"
        label="node id"
        network={network}
        number={id}
        setNumber={setId}
      />
      {!useWallet && (
        <InputAddress
          id="msg-update-metadata-curator"
          label="curator"
          long={true}
          network={network}
          address={curator}
          setAddress={setCurator}
        />
      )}
      <InputIRI
        id="msg-update-metadata-new-metadata"
        label="new metadata"
        iri={newMetadata}
        setIri={setMetadata}
      />
    </>
  )
}

export default MsgUpdateMetadata
