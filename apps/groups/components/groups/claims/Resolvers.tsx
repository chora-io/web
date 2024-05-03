'use client'

import { Resolvers } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useResolvers } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

const ResolversContainer = () => {
  const { iri } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch data resolvers from selected network
  const [resolvers, resolversError] = useResolvers(chainInfo, `${iri}`)

  const renderAddress = (address: string) => <Address address={address} />

  return (
    <Resolvers
      resolvers={resolvers}
      error={resolversError}
      renderAddress={renderAddress}
    />
  )
}

export default ResolversContainer
