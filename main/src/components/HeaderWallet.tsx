import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "chora"

import Header from "chora/components/Header"

const HeaderWallet = ({ darkTheme, toggleTheme }) => {

  const context = useContext(WalletContext)

  return (
    <Header
      context={context}
      darkTheme={darkTheme}
      toggleTheme={toggleTheme}
    />
  )
}

export default HeaderWallet
