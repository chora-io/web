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

  return (
    <AccountContext.Provider
      value={{
        authzGrantee,
        authzGranter,
        authzError,
        feeGrantee,
        feeGranter,
        feeError,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  )
}

export { AccountContext, AccountContextProvider }
