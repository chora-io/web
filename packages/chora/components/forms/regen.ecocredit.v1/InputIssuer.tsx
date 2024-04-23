import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress } from '..'

const defaultId = 'issuer'
const defaultLabel = 'issuer'

const InputIssuer = ({ id, label, network, issuer, setIssuer }: any) => {
  const [address, setAddress] = useState<string>('')

  useEffect(() => {
    const m = {
      index: issuer ? issuer.index : undefined,
      address: address,
    }

    setIssuer(m)
  }, [address])

  return (
    <>
      <InputAddress
        id={(id || defaultId) + '-address'}
        label={(label || defaultLabel) + ' address'}
        network={network}
        address={address}
        setAddress={setAddress}
      />
    </>
  )
}

export default InputIssuer
