'use client'

import { Anchor } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useAnchor } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

const AnchorContainer = () => {
  const { iri } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch data anchor from selected network
  const [anchor, error] = useAnchor(chainInfo, `${iri}`)

  return <Anchor anchor={anchor} error={error} />
}

export default AnchorContainer
