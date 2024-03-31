'use client'

import * as React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

import { WalletContext } from './WalletContext'
import { useNetworkServer } from '../hooks'

const cachedAuthAccount = 'chora-auth-account'
const cachedAuthAccounts = 'chora-auth-accounts'

// TODO: use http-only cookies for improved security

const getCachedAccount = () => {
  if (typeof localStorage !== 'undefined') {
    return JSON.parse(localStorage.getItem(cachedAuthAccount) || 'null') || null
  }
}

const getCachedAccounts = () => {
  if (typeof localStorage !== 'undefined') {
    return (
      JSON.parse(localStorage.getItem(cachedAuthAccounts) || 'null') || null
    )
  }
}

const removeCachedAccount = () => {
  localStorage.removeItem(cachedAuthAccount)
}

const removeCachedAccounts = () => {
  localStorage.removeItem(cachedAuthAccounts)
}

const setCachedAccount = (account: any) => {
  localStorage.setItem(cachedAuthAccount, JSON.stringify(account))
}

const setCachedAccounts = (accounts: any[]) => {
  localStorage.setItem(cachedAuthAccounts, JSON.stringify(accounts))
}

const AuthContext = createContext<any>({})

const AuthContextProvider = (props: any) => {
  const { chainInfo } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  const [account, setAccount] = useState<any>(null)
  const [activeAccount, setActiveAccount] = useState<any>(null)
  const [activeAccounts, setActiveAccounts] = useState<any[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  // check active account is authenticated
  useEffect(() => {
    if (!activeAccount) {
      setActiveAccount(getCachedAccount())
    }
    if (!activeAccounts) {
      setActiveAccounts(getCachedAccounts())
    }
    if (serverUrl && (!account || !activeAccount) && !error)
      checkToken().catch((err) => {
        setError(err.message)
      })
  }, [serverUrl, account, activeAccount, error])

  // check active account token with network server
  const checkToken = async () => {
    // reset error
    setError(null)

    // check server url and active account
    if (serverUrl && activeAccount) {
      // verify token and return account from network server
      await fetch(serverUrl + '/auth', {
        method: 'POST',
        body: JSON.stringify({ token: activeAccount.token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code) {
            setError(data.message)
          } else if (data.error) {
            setError(data.error)
          } else {
            // set account
            setAccount(data.user)
            // set active account
            setActiveAccount({
              id: data.user.id,
              token: activeAccount.token,
            })
          }
        })
        .catch((err) => {
          setError(err.message)
        })
    }
  }

  // set active account in state and storage
  const handleSetAccount = (a: any, t: string) => {
    // set account
    setAccount(a)

    // set active account
    setActiveAccount({ id: a.id, token: t })

    // set cached account
    setCachedAccount({ id: a.id, token: t })

    // set active account within accounts
    setAccountWithinAccounts({ id: a.id, token: t })
  }

  // remove account from state and storage
  const removeAccount = () => {
    // reset account state
    setAccount(null)

    // reset active account state
    setActiveAccount(null)

    // remove cached account
    removeCachedAccount()
  }

  // remove account from accounts in state and storage
  const removeAccountFromAccounts = (id: string) => {
    // get cached accounts
    const cas = getCachedAccounts()

    // find account in cached accounts
    const i = cas.findIndex((ca: any) => ca.id === id)

    // if valid index, remove cached account
    if (i >= 0) {
      cas.splice(i, 1)
    }

    // set active accounts
    setActiveAccounts(cas)

    // set cached accounts
    setCachedAccounts(cas)
  }

  // remove accounts from state and storage
  const removeAccounts = () => {
    // reset account state
    setAccount(null)

    // reset active account state
    setActiveAccount(null)

    // reset active accounts state
    setActiveAccounts(null)

    // remove cached account
    removeCachedAccount()

    // remove cached accounts
    removeCachedAccounts()
  }

  // set account within accounts in state and storage
  const setAccountWithinAccounts = (aa: any) => {
    // get cached accounts
    let cas = getCachedAccounts()

    if (cas) {
      // find account in cached accounts
      const i = cas.findIndex((ca: any) => ca.id === aa.id)

      // if valid index, update cached account, otherwise add cached account
      if (i >= 0) {
        cas[i] = aa
      } else {
        cas.push(aa)
      }
    } else {
      // create cached accounts with account
      cas = [aa]
    }

    // set active accounts
    setActiveAccounts(cas)

    // set cached accounts
    setCachedAccounts(cas)
  }

  // switch account in state and storage
  const switchAccount = (activeAccount: any) => {
    // reset account
    setAccount(null)

    // set active account
    setActiveAccount(activeAccount)

    // set cached account
    setCachedAccount(activeAccount)

    // set account within accounts
    setAccountWithinAccounts(activeAccount)
  }

  return (
    <AuthContext.Provider
      value={{
        account,
        activeAccount,
        activeAccounts,
        checkToken,
        error,
        removeAccount,
        removeAccountFromAccounts,
        removeAccounts,
        setAccount: handleSetAccount,
        switchAccount,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
