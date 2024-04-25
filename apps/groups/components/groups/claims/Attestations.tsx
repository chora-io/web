'use client'

import { Attestations } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useAttestations } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

const AttestationsContainer = () => {
  const { iri } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch data attestations from selected network
  const [attestations, attestationsError] = useAttestations(chainInfo, `${iri}`)

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
