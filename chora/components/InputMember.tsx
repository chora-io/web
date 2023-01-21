import * as React from "react"
import { useEffect, useState } from "react"

import InputAddress from "./InputAddress"
import InputIRI from "./InputIRI"
import InputNumber from "./InputNumber"

const defaultId = "member"
const defaultLabel = "member"

const InputMember = ({ id, label, network, member, setMember }: any) => {

  const [address, setAddress] = useState<string>("")
  const [metadata, setMetadata] = useState<string>("")
  const [weight, setWeight] = useState<string>("")

  useEffect(() => {

    const m = {
      index: member ? member.index : undefined,
      address: address,
      metadata: metadata,
      weight: weight,
    }

    setMember(m)

  }, [address, metadata, weight])

  return (
    <>
      <InputAddress
        id={(id || defaultId) + "-address"}
        label={(label || defaultLabel) + " address"}
        network={network}
        address={address}
        setAddress={setAddress}
      />
      <InputIRI
        id={(id || defaultId) + "-metadata"}
        label={(label || defaultLabel) + " metadata"}
        iri={metadata}
        setIri={setMetadata}
      />
      <InputNumber
        id={(id || defaultId) + "-weight"}
        label={(label || defaultLabel) + " weight"}
        number={weight}
        setNumber={setWeight}
      />
    </>
  )
}

export default InputMember
