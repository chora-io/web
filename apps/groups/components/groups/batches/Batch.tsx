'use client'

import { Batch } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useBatch, useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

const BatchContainer = () => {
  const { denom, groupId } = useParams()

  const { chainInfo, network } = useContext(WalletContext)

  // fetch batch from selected network
  const [batch, batchError] = useBatch(chainInfo, `${denom}`)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    batch ? batch.metadata : null,
  )

  const error = batchError || metadataError

  const renderAddress = (address: string) => <Address address={address} />

  const renderProjectId = (projectId: string) => (
    <Link href={`/${network}/${groupId}/projects/${projectId}`}>
      {projectId}
    </Link>
  )

  return (
    <Batch
      batch={batch}
      metadata={metadata}
      error={error}
      renderAddress={renderAddress}
      renderProjectId={renderProjectId}
    />
  )
}

export default BatchContainer
