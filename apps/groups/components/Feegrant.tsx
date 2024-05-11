'use client'

import { Feegrant } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useFeeGrants } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

import Address from '@components/Address'

const FeegrantContainer = () => {
  const { address } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch feegrant allowances by address from selected network
  const [feeGrantee, feeGranter, error] = useFeeGrants(
    chainInfo,
    address.toString(),
  )

  // view options
  const [filter, setFilter] = useState<string>('grantee')

  // reset state on address or network change
  useEffect(() => {
    setFilter('grantee')
  }, [address, chainInfo?.chainId])

  const renderAddress = (address: string) => <Address address={address} />

  return (
    <Feegrant
      feeGrantee={feeGrantee}
      feeGranter={feeGranter}
      error={error}
      filter={filter}
      setFilter={setFilter}
      renderAddress={renderAddress}
    />
  )
}

export default FeegrantContainer
