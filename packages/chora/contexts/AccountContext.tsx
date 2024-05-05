'use client'

import * as React from 'react'
import { createContext, useContext } from 'react'

import { WalletContext } from '.'
import { useAuthzGrants, useFeeGrants } from '../hooks'

const AccountContext = createContext<any>({})

const AccountContextProvider = (props: any) => {
  const { chainInfo, wallet } = useContext(WalletContext)

  const [authzGrantee, authzGranter, authzError] = useAuthzGrants(
    chainInfo,
    wallet?.bech32Address,
  )

  const [feeGrantee, feeGranter, feeError] = useFeeGrants(
    chainInfo,
    wallet?.bech32Address,
  )

  const walletError = !wallet && 'keplr wallet not found'

  return (
    <AccountContext.Provider
      value={{
        authzGrantee,
        authzGranter,
        authzError: authzError || walletError,
        feeGrantee: feeGrantee || walletError,
        feeGranter,
        feeError,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  )
}

export { AccountContext, AccountContextProvider }
