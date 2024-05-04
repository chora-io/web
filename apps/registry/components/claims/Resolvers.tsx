'use client'

import { Resolvers } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useResolvers } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

const ResolversContainer = () => {
  const { iri } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch data resolvers from selected network
  const [resolvers, error] = useResolvers(chainInfo, `${iri}`)

  return <Resolvers resolvers={resolvers} error={error} />
}

export default ResolversContainer
