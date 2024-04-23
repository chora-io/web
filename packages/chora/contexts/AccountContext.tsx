'use client'

import * as React from 'react'
import { createContext, useContext } from 'react'

import { WalletContext } from '.'
import { useAuthzGrants } from '../hooks'

const AccountContext = createContext<any>({})

const AccountContextProvider = (props: any) => {
  const { chainInfo, wallet } = useContext(WalletContext)

  const [grantsGrantee, grantsGranter, grantsError] = useAuthzGrants(
    chainInfo,
    wallet?.bech32Address,
  )

  return (
    <AccountContext.Provider
      value={{
        grantsGrantee,
        grantsGranter,
        grantsError,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  )
}

export { AccountContext, AccountContextProvider }
