'use client'

import { Batches } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'
import { GroupContext } from '@contexts/GroupContext'
import { useGroupBatches } from '@hooks/useGroupBatches'

const BatchesContainer = () => {
  const { groupId } = useParams()
  const { policies, policiesError } = useContext(GroupContext)
  const { chainInfo, network } = useContext(WalletContext)

  // TODO: limit, offset, setOffset, view, setView

  // fetch credit batches administered by group from selected network
  const [batches, batchesError] = useGroupBatches(chainInfo, policies)

  const error = policiesError || batchesError

  const renderAddress = (address: string) => <Address address={address} />

  const renderLink = (denom: string) => (
    <Link href={`/${network}/${groupId}/batches/${denom}`}>{'view batch'}</Link>
  )

  return (
    <Batches
      batches={batches}
      error={error}
      renderAddress={renderAddress}
      renderLink={renderLink}
    />
  )
}

export default BatchesContainer
