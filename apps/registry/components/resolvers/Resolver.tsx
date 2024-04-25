'use client'

import { Resolver } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useResolver } from '@hooks/useResolver'

const ResolverContainer = () => {
  const { id } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch data resolver from selected network
  const [resolver, error] = useResolver(chainInfo, `${id}`)

  return <Resolver resolver={resolver} error={error} />
}

export default ResolverContainer
