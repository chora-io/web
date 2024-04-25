'use client'

import { Attestations } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'
import { GroupContext } from '@contexts/GroupContext'
import { useGroupAttestations } from '@hooks/useGroupAttestations'

const ClaimsContainer = () => {
  const { groupId } = useParams()
  const { policies, policiesError } = useContext(GroupContext)
  const { chainInfo, network } = useContext(WalletContext)

  // fetch data attestations by group from selected network
  const [attestations, attestationsError] = useGroupAttestations(
    chainInfo,
    policies,
  )

  const error = policiesError || attestationsError

  const renderAddress = (address: string) => <Address address={address} />

  const renderLink = (iri: string) => (
    <Link href={`/${network}/${groupId}/claims/${iri}`}>{'view claim'}</Link>
  )

  return (
    <Attestations
      attestations={attestations}
      error={error}
      renderAddress={renderAddress}
      renderLink={renderLink}
    />
  )
}

export default ClaimsContainer
