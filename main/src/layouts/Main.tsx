import * as React from "react"

import { WalletContextProvider } from "chora"

import Header from "../components/Header"
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
        <Header />
        {children}
      </main>
    )}
  </>
)

export default Main
