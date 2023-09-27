import { createContext, useContext, useEffect, useState } from "react"

import { WalletContext } from "./WalletContext"
import { useNetworkServer } from "../hooks"

const cachedAuthAccount = "chora-auth-account"
const cachedAuthAccounts = "chora-auth-accounts"

// TODO: use http-only cookies for improved security

const getCachedAccount = () => {
  if (typeof localStorage !== "undefined") {
    return JSON.parse(localStorage.getItem(cachedAuthAccount) || 'null') || undefined
  }
}

const getCachedAccounts = () => {
  if (typeof localStorage !== "undefined") {
    return JSON.parse(localStorage.getItem(cachedAuthAccounts) || 'null') || undefined
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

  // TODO: reconsider context within context for server url
  // currently required to check on load within context provider
  // and ideally network server would be determined by selected network
  // will likely need to move useEffect outside context provider

  const { chainInfo } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  const [account, setAccount] = useState<any>(undefined)
  const [activeAccount, setActiveAccount] = useState<any>(getCachedAccount())
  const [activeAccounts, setActiveAccounts] = useState<any[] | undefined>(getCachedAccounts())
  const [error, setError] = useState<string | undefined>(undefined)

  // check active account is authenticated
  useEffect(() => {
    checkToken().catch(err => {
      setError(err.message)
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
    setAccount(undefined)

    // reset active account state
    setActiveAccount(undefined)

    // remove cached account
    removeCachedAccount()
  }

  // remove account from accounts in state and storage
  const removeAccountFromAccounts = (id: string) => {

    // get cached accounts
    let cas = getCachedAccounts()

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
    setAccount(undefined)

    // reset active account state
    setActiveAccount(undefined)

    // reset active accounts state
    setActiveAccounts(undefined)

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
    setAccount(undefined)

    // set active account
    setActiveAccount(activeAccount)

    // set cached account
    setCachedAccount(activeAccount)

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
