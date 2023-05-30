import * as React from "react"

import { WalletContextProvider } from "chora"
import Background from "chora/components/Background"
import { useDarkTheme } from "chora/hooks/useDarkTheme"

import Header from "../components/HeaderWrapper"
import Sidebar from "../components/Sidebar"

import * as styles from "./Main.module.css"

const Main = ({ children, withBackground }: any) => {
  const [darkTheme, setDarkTheme] = useDarkTheme()

  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }

  return (
    <WalletContextProvider>
      <main className={darkTheme ? styles.darkTheme : null}>
        <div hidden={true}>
          {darkTheme.toString()}
        </div>
        {withBackground ? (
          <Background darkTheme={darkTheme} withImage={true} />
        ) : (
          <Background darkTheme={darkTheme} />
        )}
        <Header
          darkTheme={darkTheme}
          toggleTheme={toggleTheme}
        />
        <Sidebar />
        {children}
      </main>
    </WalletContextProvider>
  )
}

export default Main
