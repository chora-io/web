import * as React from "react"
import { useEffect, useState } from "react"

import { MsgCreate } from "../../api/chora/geonode/v1/msg"

import InputAddress from "../InputAddress"
import InputIRI from "../InputIRI"

const MsgCreateInputs = ({ network, setMessage }: any) => {

  const [curator, setCurator] = useState<string>("")
  const [metadata, setMetadata] = useState<string>("")

  useEffect(() => {

    const msg = {
        $type: "chora.geonode.v1.MsgCreate",
        curator: curator,
        metadata: metadata,
    } as MsgCreate

    const msgAny = {
        typeUrl: "/chora.geonode.v1.MsgCreate",
        value: MsgCreate.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [curator, metadata])

  return (
    <>
      <InputAddress
        id="msg-create-curator"
        label="curator"
        long={true}
        network={network}
        address={curator}
        setAddress={setCurator}
      />
      <InputIRI
        id="msg-create-metadata"
        label="metadata"
        iri={metadata}
        setIri={setMetadata}
      />
    </>
  )
}

export default MsgCreateInputs
