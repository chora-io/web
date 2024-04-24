'use client'

import { Baskets } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext, useState } from 'react'

import { useBaskets } from '@hooks/useBaskets'

const BasketsContainer = () => {
  const { chainInfo, network } = useContext(WalletContext)

  const limit = 5

  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // fetch baskets from selected network
  const [baskets, error] = useBaskets(chainInfo, limit, offset)

  const renderLink = (denom: string) => (
    <Link href={`/${network}/baskets/${denom}`}>{'view basket'}</Link>
  )

  return (
    <Baskets
      baskets={baskets}
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

export default BasketsContainer
