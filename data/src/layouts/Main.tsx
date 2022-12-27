import * as React from "react"

import { WalletContextProvider } from "../contexts/WalletContext"

import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

import "./Main.module.css"

const Main = ({ children }: any) => (
  <WalletContextProvider>
    <main>
      <Header />
      <Sidebar />
      {children}
    </main>
  </WalletContextProvider>
)

export default Main
