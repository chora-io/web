'use client'

import { Resolvers } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext, useState } from 'react'

import { useResolvers } from '@hooks/useResolvers'

const ResolversContainer = () => {
  const { chainInfo, network } = useContext(WalletContext)

  const limit = 5

  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // fetch resolvers from selected network
  const [resolvers, error] = useResolvers(chainInfo, limit, offset)

  const renderLink = (resolverId: string) => (
    <Link href={`/${network}/resolvers/${resolverId}`}>{'view resolver'}</Link>
  )

  return (
    <Resolvers
      resolvers={resolvers}
      error={error}
      renderLink={renderLink}
      limit={limit}
      offset={offset}
      setOffset={setOffset}
      view={view}
      setView={setView}
    />
  )
}

export default ResolversContainer
