import * as React from "react"
import { useEffect, useState } from "react"

import Background from "chora/components/Background"
import { cachedDarkKey, prefersDark } from "chora/utils/theme"

import Header from "../components/Header"

import * as styles from "./Main.module.css"

const Main = ({ children, location, withBackground }: any) => {
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
