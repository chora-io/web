import * as React from "react"

import { WalletContextProvider } from "chora"

import Header from "../components/HeaderWrapper"
import Sidebar from "../components/Sidebar"

import "./Main.module.css"

const Main = ({ children, location }: any) => (
  <WalletContextProvider>
    <main>
      <Header />
      <Sidebar location={location} />
      {children}
    </main>
  </WalletContextProvider>
)

export default Main
