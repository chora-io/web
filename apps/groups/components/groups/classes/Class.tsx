'use client'

import { Class } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useMetadata, useClass } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

const ClassContainer = () => {
  const { id } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch class from selected network
  const [clazz, classError] = useClass(chainInfo, id.toString())

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    clazz ? clazz.metadata : null,
  )

  const error = classError || metadataError

  const renderAddress = (address: string) => <Address address={address} />

  return (
    <Class
      clazz={clazz}
      metadata={metadata}
      error={error}
      renderAddress={renderAddress}
    />
  )
}

export default ClassContainer
