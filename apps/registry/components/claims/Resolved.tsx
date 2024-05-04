'use client'

import { Resolved } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

const ResolvedContainer = () => {
  const { iri } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch data from network server, otherwise resolve
  const [metadata, error, resolverUrl] = useMetadata(chainInfo, `${iri}`)

  return (
    <Resolved
      iri={`${iri}`.replace('%3A', ':')}
      metadata={metadata}
      resolverUrl={resolverUrl}
      error={error}
    />
  )
}

export default ResolvedContainer
