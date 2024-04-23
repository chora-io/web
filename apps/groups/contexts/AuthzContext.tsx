'use client'

import { WalletContext } from 'chora/contexts'
import { useAuthzGrants } from 'chora/hooks'
import * as React from 'react'
import { createContext, useContext } from 'react'

const AuthzContext = createContext<any>({})

const AuthzContextProvider = (props: any) => {
  const { chainInfo, wallet } = useContext(WalletContext)

  const [grantsGrantee, grantsGranter, grantsError] = useAuthzGrants(
    chainInfo,
    wallet?.bech32Address,
  )

  return (
    <AuthzContext.Provider
      value={{
        grantsGrantee,
        grantsGranter,
        grantsError,
      }}
    >
      {props.children}
    </AuthzContext.Provider>
  )
}

export { AuthzContext, AuthzContextProvider }
