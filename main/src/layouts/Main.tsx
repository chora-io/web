import * as React from "react"
import { useEffect, useState } from "react"

import { WalletContextProvider } from "chora"
import Background from "chora/components/Background"
import { cachedDarkKey, prefersDark } from "chora/utils/theme"

import Header from "../components/Header"
import HeaderWallet from "../components/HeaderWallet"

import * as styles from "./Main.module.css"

const Main = ({ children, withBackground, withWallet }: any) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(prefersDark())

  useEffect(() => {
    localStorage.setItem(cachedDarkKey, darkTheme ? "true" : "false")
  }, [darkTheme])

  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }

  return (
    <main className={darkTheme ? styles.darkTheme : null}>
      {withBackground ? (
        <Background darkTheme={darkTheme} withImage={true} />
      ) : (
        <Background darkTheme={darkTheme} />
      )}
      {withWallet ? (
        <WalletContextProvider>
          <HeaderWallet
            darkTheme={darkTheme}
            toggleTheme={toggleTheme}
          />
          {children}
        </WalletContextProvider>
      ) : (
        <>
          <Header
            darkTheme={darkTheme}
            toggleTheme={toggleTheme}
          />
          {children}
        </>
      )}
    </main>
  )
}

export default Main
