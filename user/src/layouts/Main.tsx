import * as React from "react"

import { AuthContextProvider } from "chora"
import { WalletContextProvider } from "chora"
import { Background } from "chora/components"
import { useDarkTheme } from "chora/hooks"

import Header from "../components/HeaderWrapper"
import Sidebar from "../components/Sidebar"

import * as styles from "./Main.module.css"

const Main = ({ children, withBackground }: any) => {
  const [darkTheme, setDarkTheme] = useDarkTheme()

  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }

  return (
    <AuthContextProvider>
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
    </AuthContextProvider>
  )
}

export default Main
