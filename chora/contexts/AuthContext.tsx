import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { useNetworkServer } from "chora/hooks/useNetworkServer"

const cachedAuthAccount = "chora-auth-account"
const cachedAuthAccounts = "chora-auth-accounts"

// TODO: use http-only cookies for improved security

const getCachedAccount = () => {
  return JSON.parse(localStorage.getItem(cachedAuthAccount)) || undefined
}

const getCachedAccounts = () => {
  return JSON.parse(localStorage.getItem(cachedAuthAccounts)) || undefined
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

const AuthContext = createContext({})

const AuthContextProvider = (props: any) => {

  // TODO: reconsider context within context for server url

  const { chainInfo } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  const [account, setAccount] = useState<any>(undefined)
  const [activeAccount, setActiveAccount] = useState<any>(getCachedAccount())
  const [activeAccounts, setActiveAccounts] = useState<any[] | undefined>(getCachedAccounts())
  const [error, setError] = useState<string | undefined>(undefined)

  // check active account is authenticated
  useEffect(() => {
    checkToken().catch(err => {
      setError(err)
    })
  }, [(!error && account === undefined && activeAccount !== undefined), serverUrl]);

  // check active account token with network server
  const checkToken = async ()=> {

    // reset error
    setError(undefined)

    // check server url and active account
    if (serverUrl && activeAccount) {

      // verify token and return account from network server
      await fetch(serverUrl + "/auth", {
        method: "POST",
        body: JSON.stringify({ token: activeAccount.token }),
      })
        .then(res => res.json())
        .then(data => {
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
        .catch(err => {
          setError(err.message)
        })
    }
  }

  // set active account in state and storage
  const handleSetAccount = (a: any, t: string) => {

    // set account
    setAccount(a)

    // set cached account
    setCachedAccount({ id: a.id, token: t })

    // set active account
    setActiveAccount({ id: a.id, token: t })

    // set active account within accounts
    setAccountWithinAccounts({ id: a.id, token: t })
  }

  // remove account from state and storage
  const removeAccount = () => {

    // remove cached account
    removeCachedAccount()

    // reset account state
    setAccount(undefined)

    // reset active account state
    setActiveAccount(undefined)
  }

  // remove account from accounts in state and storage
  const removeAccountFromAccounts = (id: string) => {

    // get cached accounts
    let cas = getCachedAccounts()

    // find account in cached accounts
    const i = cas.findIndex(ca => ca.id === id)

    // if valid index, remove cached account
    if (i >= 0) {
      cas.splice(i, 1)
    }

    // set cached accounts
    setCachedAccounts(cas)

    // set active accounts
    setActiveAccounts(cas)
  }

  // remove accounts from state and storage
  const removeAccounts = () => {

    // remove cached account
    removeCachedAccount()

    // remove cached accounts
    removeCachedAccounts()

    // reset account state
    setAccount(undefined)

    // reset cached account state
    setActiveAccount(undefined)

    // reset cached accounts state
    setActiveAccounts(undefined)
  }

  // set account within accounts in state and storage
  const setAccountWithinAccounts = (aa: any) => {

    // get cached accounts
    let cas = getCachedAccounts()

    if (cas) {

      // find account in cached accounts
      const i = cas.findIndex(ca => ca.id === aa.id)

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

    // set cached accounts
    setCachedAccounts(cas)

    // set active accounts
    setActiveAccounts(cas)
  }

  // switch account in state and storage
  const switchAccount = (activeAccount: any) => {

    // reset account
    setAccount(undefined)

    // set cached account
    setCachedAccount(activeAccount)

    // set active account
    setActiveAccount(activeAccount)

    // set account within accounts
    setAccountWithinAccounts(activeAccount)
  }

  return (
    <AuthContext.Provider value={{
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
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthContextProvider,
}
