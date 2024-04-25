'use client'

import { Attestations } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useAttestations } from '@hooks/useAttestations'

const AttestationsContainer = () => {
  const { iri } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch data attestations from selected network
  const [attestations, error] = useAttestations(chainInfo, `${iri}`)

  return <Attestations attestations={attestations} error={error} />
}

export default AttestationsContainer
