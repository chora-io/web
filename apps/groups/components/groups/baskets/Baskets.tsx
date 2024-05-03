'use client'

import { Baskets } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'
import { GroupContext } from '@contexts/GroupContext'
import { useGroupBaskets } from '@hooks/useGroupBaskets'

const BasketsContainer = () => {
  const { groupId } = useParams()

  const { policies, policiesError } = useContext(GroupContext)
  const { chainInfo, network } = useContext(WalletContext)

  // TODO: limit, offset, setOffset, view, setView

  // fetch credit baskets curated by group from selected network
  const [baskets, basketsError] = useGroupBaskets(chainInfo, policies)

  const error = policiesError || basketsError

  const renderAddress = (address: string) => <Address address={address} />

  const renderLink = (denom: string) => (
    <Link href={`/${network}/${groupId}/baskets/${denom}`}>
      {'view basket'}
    </Link>
  )

  return (
    <Baskets
      baskets={baskets}
      error={error}
      renderAddress={renderAddress}
      renderLink={renderLink}
    />
  )
}

export default BasketsContainer
