'use client'

import { Resolvers } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useResolvers } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

const ResolversContainer = () => {
  const { iri } = useParams()

  const iriString = iri.toString().replace('%3A', ':')

  const { chainInfo } = useContext(WalletContext)

  // fetch data resolvers from selected network
  const [resolvers, error] = useResolvers(chainInfo, iriString)

  return <Resolvers resolvers={resolvers} error={error} />
}

export default ResolversContainer
