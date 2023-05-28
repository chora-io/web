import * as React from "react"
import { useEffect, useState } from "react"

import { WalletContextProvider } from "chora"
import Background from "chora/components/Background"
import { cachedDarkKey, prefersDark } from "chora/utils/theme"

import Header from "../components/HeaderWrapper"
import Sidebar from "../components/Sidebar"

import * as styles from "./Main.module.css"

const Main = ({ children, withBackground }: any) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(prefersDark())

  useEffect(() => {
    localStorage.setItem(cachedDarkKey, darkTheme ? "true" : "false")
  }, [darkTheme])

  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }

  return (
    <WalletContextProvider>
      <main className={darkTheme ? styles.darkTheme : null}>
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
