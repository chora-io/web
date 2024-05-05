'use client'

import * as React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

import { WalletContext } from '.'
import { useAuthzGrants, useFeeGrants } from '../hooks'

const AccountContext = createContext<any>({})

const AccountContextProvider = (props: any) => {
  const { chainInfo, loading, wallet } = useContext(WalletContext)

  const [authzGrantee, authzGranter, authzError] = useAuthzGrants(
    chainInfo,
    wallet?.bech32Address,
  )

  const [feeGrantee, feeGranter, feeError] = useFeeGrants(
    chainInfo,
    wallet?.bech32Address,
  )

  const [hasMounted, setHasMounted] = useState<boolean>(false)
  const [walletError, setWalletError] = useState<string | null>(null)

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true)
    }
    if (!wallet && !loading && hasMounted) {
      setWalletError('keplr wallet not found')
    }
    if (wallet && hasMounted) {
      setWalletError(null)
    }
  }, [wallet, loading, hasMounted])

  return (
    <AccountContext.Provider
      value={{
        authzGrantee,
        authzGranter,
        authzError: walletError || authzError,
        feeGrantee,
        feeGranter,
        feeError: walletError || feeError,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  )
}

export { AccountContext, AccountContextProvider }
