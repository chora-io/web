import * as React from "react"
import { useEffect, useState } from "react"

import { WalletContextProvider } from "chora"
import Background from "chora/components/Background"
import { cachedPrefersDark, prefersDark } from "chora/utils/theme"

import Header from "../components/Header"
import HeaderWallet from "../components/HeaderWallet"

import * as styles from "./Main.module.css"

const Main = ({ children, withBackground, withWallet }: any) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(prefersDark())

  useEffect(() => {
    localStorage.setItem(cachedPrefersDark, darkTheme ? "true" : "false")
  }, [darkTheme])

  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }

  return (
    <main className={darkTheme ? styles.darkTheme : null}>
      <Background darkTheme={darkTheme} />
      <Header
        location={location}
        darkTheme={darkTheme}
        toggleTheme={toggleTheme}
      />
      {children}
    </main>
  )
}

export default Main
