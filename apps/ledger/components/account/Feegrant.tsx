'use client'

import { Feegrant } from 'chora/components/boxes'
import { AccountContext, WalletContext } from 'chora/contexts'
import { useContext, useEffect, useState } from 'react'

const FeegrantContainer = () => {
  const { feeGrantee, feeGranter, feeError: error } = useContext(AccountContext)
  const { chainInfo, wallet } = useContext(WalletContext)

  // view options
  const [filter, setFilter] = useState<string>('grantee')

  // reset state on address or network change
  useEffect(() => {
    setFilter('grantee')
  }, [chainInfo?.rest, wallet?.bech32Address])

  return (
    <Feegrant
      feeGrantee={feeGrantee}
      feeGranter={feeGranter}
      error={error}
      filter={filter}
      setFilter={setFilter}
    />
  )
}

export default FeegrantContainer
