'use client'

import { Class } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useMetadata, useSubject } from 'chora/hooks'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

const ClassContainer = () => {
  const { id } = useParams()
  const { chainInfo, network } = useContext(WalletContext)

  // fetch class from selected network
  const [clazz, classError] = useSubject(chainInfo, `${id}`)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    clazz ? clazz.metadata : null,
  )

  const error = classError || metadataError

  const renderAddress = (address: string) => <Address address={address} />

  const renderMetadata = (metadata: string) => (
    <Link href={`/${network}/claims/${metadata}`}>{metadata}</Link>
  )

  return (
    <Class
      clazz={clazz}
      metadata={metadata}
      error={error}
      renderAddress={renderAddress}
      renderMetadata={renderMetadata}
    />
  )
}

export default ClassContainer
