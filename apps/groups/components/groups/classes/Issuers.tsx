'use client'

import { ClassIssuers } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useClassIssuers } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

const Issuers = () => {
  const { id } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch class issuers from selected network
  const [issuers, error] = useClassIssuers(chainInfo, `${id}`)

  const renderAddress = (address: string) => <Address address={address} />

  return (
    <ClassIssuers
      issuers={issuers}
      error={error}
      renderAddress={renderAddress}
    />
  )
}

export default Issuers
