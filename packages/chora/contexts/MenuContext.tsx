'use client'

import * as React from 'react'
import { createContext, useState } from 'react'

const MenuContext = createContext<any>({})

const MenuContextProvider = (props: any) => {
  const [showUser, setShowUser] = useState<boolean>(false)

  return (
    <MenuContext.Provider
      value={{
        showUser,
        setShowUser,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  )
}

export { MenuContext, MenuContextProvider }
