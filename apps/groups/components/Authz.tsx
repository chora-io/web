'use client'

import { Authz } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useAuthzGrants } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

import Address from '@components/Address'

const AuthzContainer = () => {
  const { address } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch authz grants by address from selected network
  const [authzGrantee, authzGranter, error] = useAuthzGrants(
    chainInfo,
    `${address}`,
  )

  // view options
  const [filter, setFilter] = useState<string>('grantee')

  // reset state on address or network change
  useEffect(() => {
    setFilter('grantee')
  }, [address, chainInfo?.chainId])

  const renderAddress = (address: string) => <Address address={address} />

  return (
    <Authz
      authzGrantee={authzGrantee}
      authzGranter={authzGranter}
      error={error}
      filter={filter}
      setFilter={setFilter}
      renderAddress={renderAddress}
    />
  )
}

export default AuthzContainer
