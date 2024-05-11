'use client'

import { Attestations } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useAttestations } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

const AttestationsContainer = () => {
  const { iri } = useParams()

  const iriString = iri.toString().replace('%3A', ':')

  const { chainInfo } = useContext(WalletContext)

  // fetch data attestations from selected network
  const [attestations, attestationsError] = useAttestations(
    chainInfo,
    iriString,
  )

  const renderAddress = (address: string) => <Address address={address} />

  return (
    <Attestations
      attestations={attestations}
      error={attestationsError}
      renderAddress={renderAddress}
    />
  )
}

export default AttestationsContainer
