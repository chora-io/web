import * as React from "react"

import { WalletContextProvider } from "chora"

import HeaderMain from "../components/HeaderMain"
import HeaderWallet from "../components/HeaderWallet"

import "./Main.module.css"

const Main = ({ children, withWallet }: any) => (
  <>
    {withWallet ? (
      <WalletContextProvider>
        <main>
          <HeaderWallet />
          {children}
        </main>
      </WalletContextProvider>
    ) : (
      <main>
        <HeaderMain />
        {children}
      </main>
    )}
  </>
)

export default Main
