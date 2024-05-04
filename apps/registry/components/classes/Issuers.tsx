'use client'

import { ClassIssuers } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useClassIssuers } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

const Issuers = () => {
  const { id } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch class issuers from selected network
  const [issuers, error] = useClassIssuers(chainInfo, `${id}`)

  return <ClassIssuers issuers={issuers} error={error} />
}

export default Issuers
