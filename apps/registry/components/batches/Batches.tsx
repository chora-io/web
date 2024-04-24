'use client'

import { Batches } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext, useState } from 'react'

import { useBatches } from '@hooks/useBatches'

const BatchesContainer = () => {
  const { chainInfo, network } = useContext(WalletContext)

  const limit = 5

  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // fetch credit batches from selected network
  const [batches, error] = useBatches(chainInfo, 5, offset)

  const renderLink = (denom: string) => (
    <Link href={`/${network}/batches/${denom}`}>{'view batch'}</Link>
  )

  return (
    <Batches
      batches={batches}
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

export default BatchesContainer
