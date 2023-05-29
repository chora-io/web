import * as React from "react"

import Background from "chora/components/Background"
import { useDarkTheme } from "chora/hooks/useDarkTheme"

import Header from "../components/Header"

import * as styles from "./Main.module.css"

const Main = ({ children, location, withBackground }: any) => {
  const [darkTheme, setDarkTheme] = useDarkTheme()

  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }

  return (
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
        location={location}
        darkTheme={darkTheme}
        toggleTheme={toggleTheme}
      />
      {children}
    </main>
  )
}

export default Main
