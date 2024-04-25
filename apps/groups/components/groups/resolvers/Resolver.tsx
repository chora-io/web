'use client'

import { Resolver } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useResolver } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

const ResolverContainer = () => {
  const { id } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch resolver from selected network
  const [resolver, error] = useResolver(chainInfo, `${id}`)

  const renderAddress = (address: string) => <Address address={address} />

  return (
    <Resolver resolver={resolver} error={error} renderAddress={renderAddress} />
  )
}

export default ResolverContainer
