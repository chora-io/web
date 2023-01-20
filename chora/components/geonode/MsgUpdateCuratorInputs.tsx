import * as React from "react"
import { useEffect, useState } from "react"
import * as Long from "long"

import { MsgUpdateCurator } from "../../api/chora/geonode/v1/msg"

import InputAddress from "../InputAddress"
import InputNumber from "../InputNumber"

const MsgUpdateCuratorInputs = ({ network, setMessage }: any) => {

  const [id, setId] = useState<string>("")
  const [curator, setCurator] = useState<string>("")
  const [newCurator, setNewCurator] = useState<string>("")

  useEffect(() => {

    const msg = {
        $type: "chora.voucher.v1.MsgUpdateCurator",
        id: Long.fromString(id || "0"),
        curator: curator,
        newCurator: newCurator,
    } as MsgUpdateCurator

    const msgAny = {
        typeUrl: "/chora.voucher.v1.MsgUpdateCurator",
        value: MsgUpdateCurator.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [id, curator, newCurator])

  return (
    <>
      <InputNumber
        id="msg-update-curator-id"
        label="id"
        network={network}
        number={id}
        setNumber={setId}
      />
      <InputAddress
        id="msg-update-curator-curator"
        label="curator"
        long={true}
        network={network}
        address={curator}
        setAddress={setCurator}
      />
      <InputAddress
        id="msg-update-curator-new-curator"
        label="new curator"
        long={true}
        network={network}
        address={newCurator}
        setAddress={setNewCurator}
      />
    </>
  )
}

export default MsgUpdateCuratorInputs
