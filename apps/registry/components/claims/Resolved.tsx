'use client'

import { Resolved } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

const ResolvedContainer = () => {
  const { iri } = useParams()

  const iriString = iri.toString().replace('%3A', ':')

  const { chainInfo } = useContext(WalletContext)

  // fetch data from network server, otherwise resolve
  const [metadata, error, resolverUrl] = useMetadata(chainInfo, iriString)

  return (
    <Resolved
      iri={iriString}
      metadata={metadata}
      resolverUrl={resolverUrl}
      error={error}
    />
  )
}

export default ResolvedContainer
