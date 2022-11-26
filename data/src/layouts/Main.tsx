import * as React from "react"

import { WalletContextProvider } from "../context/WalletContext";
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

import "./Main.css"

const Main = ({ children }: any) => {

  // ...

  return (
    <WalletContextProvider>
      <main>
        <Header />
        <Sidebar />
        {children}
      </main>
    </WalletContextProvider>
  )
}

export default Main
