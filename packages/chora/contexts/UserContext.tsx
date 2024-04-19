'use client'

import * as React from 'react'
import { createContext, useState } from 'react'

const UserContext = createContext<any>({})

const UserContextProvider = (props: any) => {
  const [showUser, setShowUser] = useState<boolean>(false)

  return (
    <UserContext.Provider
      value={{
        showUser,
        setShowUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
