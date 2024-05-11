'use client'

import { Anchor } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useAnchor } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

const AnchorContainer = () => {
  const { iri } = useParams()

  const iriString = iri.toString().replace('%3A', ':')

  const { chainInfo } = useContext(WalletContext)

  // fetch data anchor from selected network
  const [anchor, anchorError] = useAnchor(chainInfo, iriString)

  return <Anchor anchor={anchor} error={anchorError} />
}

export default AnchorContainer
