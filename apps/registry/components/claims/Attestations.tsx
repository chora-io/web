'use client'

import { Attestations } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useAttestations } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

const AttestationsContainer = () => {
  const { iri } = useParams()

  const iriString = iri.toString().replace('%3A', ':')

  const { chainInfo } = useContext(WalletContext)

  // fetch data attestations from selected network
  const [attestations, error] = useAttestations(chainInfo, iriString)

  return <Attestations attestations={attestations} error={error} />
}

export default AttestationsContainer
