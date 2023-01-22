import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "chora"

import Header from "chora/components/Header"

const HeaderWallet = () => {

  const context = useContext(WalletContext)

  return (
    <Header
      context={context}
    />
  )
}

export default HeaderWallet
