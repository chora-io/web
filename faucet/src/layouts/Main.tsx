import * as React from "react"

import { WalletContextProvider } from "../contexts/WalletContext"

import Header from "../components/Header"

import "./Main.module.css"

const Main = ({ children }: any) => (
  <WalletContextProvider>
    <main>
      <Header />
      {children}
    </main>
  </WalletContextProvider>
)

export default Main
