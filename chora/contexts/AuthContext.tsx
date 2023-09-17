import * as React from "react"
import { createContext, useState } from "react"

const cachedAuthToken = "chora-auth-token"

const AuthContext = createContext({})

const AuthContextProvider = (props: any) => {

  const [error, setError] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [authUser, setAuthUser] = useState<any>(undefined)

  // check authentication token with network server
  const checkAuthToken = async (serverUrl)=> {

    // set loading true
    setLoading(true)

    // TODO: use http-only cookies for better security
    const token = localStorage.getItem(cachedAuthToken)

    if (token) {
      await fetch(serverUrl + "/auth", {
        method: "POST",
        body: JSON.stringify({ token }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.code) {
            setError(data.message)
          } else {

            // TODO: return user information from chora server
            setAuthUser({ authenticated: true })

          }
        })
        .catch(err => {
          setError(err.message)
        })
    }

    // set loading false
    setLoading(false)
  }

  // remove authentication token
  const removeAuthToken = async () => {

    // TODO: use http-only cookies for better security
    localStorage.removeItem(cachedAuthToken)

    setAuthUser(undefined)
  }

  // set authentication token
  const setAuthToken = (token: string) => {

    // TODO: use http-only cookies for better security
    localStorage.setItem(cachedAuthToken, token)
  }

  return (
    <AuthContext.Provider value={{
      authUser,
      checkAuthToken,
      removeAuthToken,
      setAuthToken,
      setAuthUser,
      loading,
      error,
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export {
  cachedAuthToken,
  AuthContext,
  AuthContextProvider,
}
