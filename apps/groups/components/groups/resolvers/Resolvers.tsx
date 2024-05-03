'use client'

import { Resolvers } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'
import { GroupContext } from '@contexts/GroupContext'
import { useGroupResolvers } from '@hooks/useGroupResolvers'

const ResolversContainer = () => {
  const { groupId } = useParams()

  const { policies, policiesError } = useContext(GroupContext)
  const { chainInfo, network } = useContext(WalletContext)

  // fetch data resolvers from selected network
  const [resolvers, resolversError] = useGroupResolvers(chainInfo, policies)

  const error = policiesError || resolversError

  const renderAddress = (address: string) => <Address address={address} />

  const renderLink = (id: string) => (
    <Link href={`/${network}/${groupId}/resolvers/${id}`}>
      {'view resolver'}
    </Link>
  )

  return (
    <Resolvers
      resolvers={resolvers}
      error={error}
      renderAddress={renderAddress}
      renderLink={renderLink}
    />
  )
}

export default ResolversContainer
