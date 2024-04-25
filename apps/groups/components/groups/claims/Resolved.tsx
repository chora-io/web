'use client'

import { Resolved } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

const ResolvedContainer = () => {
  const { iri } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(chainInfo, `${iri}`)

  return (
    <Resolved
      iri={`${iri}`.replace('%3A', ':')}
      metadata={metadata}
      error={metadataError}
    />
  )
}

export default ResolvedContainer
