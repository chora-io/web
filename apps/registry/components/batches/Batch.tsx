'use client'

import { Batch } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useBatch, useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

const BatchContainer = () => {
  const { denom } = useParams()

  const { chainInfo, network } = useContext(WalletContext)

  // fetch credit batch from selected network
  const [batch, batchError] = useBatch(chainInfo, denom.toString())

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    batch ? batch.metadata : null,
  )

  const error = batchError || metadataError

  const renderMetadata = (metadata: string) => (
    <Link href={`/${network}/claims/${metadata}`}>{metadata}</Link>
  )

  const renderProjectId = (projectId: string) => (
    <Link href={`/${network}/projects/${projectId}`}>{projectId}</Link>
  )

  return (
    <Batch
      batch={batch}
      metadata={metadata}
      error={error}
      renderMetadata={renderMetadata}
      renderProjectId={renderProjectId}
    />
  )
}

export default BatchContainer
