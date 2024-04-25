'use client'

import { Authz } from 'chora/components/boxes'
import { AccountContext, WalletContext } from 'chora/contexts'
import { useContext, useEffect, useState } from 'react'

const AuthzContainer = () => {
  const {
    authzGrantee,
    authzGranter,
    authzError: error,
  } = useContext(AccountContext)
  const { chainInfo, wallet } = useContext(WalletContext)

  // view options
  const [filter, setFilter] = useState<string>('grantee')

  // reset state on address or network change
  useEffect(() => {
    setFilter('grantee')
  }, [chainInfo?.rest, wallet?.bech32Address])

  return (
    <Authz
      authzGrantee={authzGrantee}
      authzGranter={authzGranter}
      error={error}
      filter={filter}
      setFilter={setFilter}
    />
  )
}

export default AuthzContainer
