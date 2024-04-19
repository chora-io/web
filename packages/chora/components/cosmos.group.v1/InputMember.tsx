import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputIRI, InputNumber } from '..'

const defaultId = 'member'
const defaultLabel = 'member'

const InputMember = ({ id, label, network, member, setMember }: any) => {
  const [address, setAddress] = useState<string>(member.address || '')
  const [metadata, setMetadata] = useState<string>(member.metadata || '')
  const [weight, setWeight] = useState<string>(member.weight || '')

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
        id={(id || defaultId) + '-address'}
        label={(label || defaultLabel) + ' address'}
        network={network}
        address={address}
        setAddress={setAddress}
      />
      <InputIRI
        id={(id || defaultId) + '-metadata'}
        label={(label || defaultLabel) + ' metadata'}
        iri={metadata}
        setIri={setMetadata}
      />
      <InputNumber
        id={(id || defaultId) + '-weight'}
        label={(label || defaultLabel) + ' weight'}
        number={weight}
        setNumber={setWeight}
      />
    </>
  )
}

export default InputMember
