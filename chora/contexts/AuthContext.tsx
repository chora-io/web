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

    // get authentication token
    const token = getAuthToken()

    if (token) {

      // get user from network server using authentication token
      await fetch(serverUrl + "/auth", {
        method: "POST",
        body: JSON.stringify({ token }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.code) {
            setError(data.message)
          } else {
            setAuthUser(data.user)
          }
        })
        .catch(err => {
          setError(err.message)
        })

    } else {

      // reset user state if token does not exist
      setAuthUser(undefined)
    }

    // set loading false
    setLoading(false)
  }

  const getAuthToken = () => {

    // TODO: use http-only cookies for improved security
    return localStorage.getItem(cachedAuthToken) || ""
  }

  // remove authentication token
  const removeAuthToken = () => {

    // TODO: use http-only cookies for improved security
    localStorage.removeItem(cachedAuthToken)

    // reset user state if token does not exist
    setAuthUser(undefined)
  }

  // set authentication token
  const setAuthToken = (token: string) => {

    // TODO: use http-only cookies for improved security
    localStorage.setItem(cachedAuthToken, token)
  }

  return (
    <AuthContext.Provider value={{
      authUser,
      checkAuthToken,
      getAuthToken,
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
