import * as React from "react"
import { useContext } from "react"

import Image from 'next/image'
import Link from "next/link"

import { ThemeContext } from "../contexts"
import ConnectWallet from "./ConnectWallet"
import ThemeButton from "./ThemeButton"

import choraLogoDark from "../assets/images/chora_dark_icon.png"
import choraLogoLight from "../assets/images/chora_light_icon.png"

import styles from "./Header.module.css"

const Header = () => {

  let local = false
  if (typeof window !== "undefined" && (
      window.location.hostname == "0.0.0.0" ||
      window.location.hostname == "127.0.0.1" ||
      window.location.hostname == "localhost"
    )
  ) { local = true }

  const { darkTheme, setDarkTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
    if (darkTheme) {
      setDarkTheme(false)
    } else {
      setDarkTheme(true)
    }
  }

  return (
    <div className={styles.header}>
      <div>
        <div className={styles.title}>
          <Link href={local ? "http://" + window.location.hostname + ":8000" : "https://chora.io"}>
            <Image
              alt="chora"
              src={darkTheme ? choraLogoDark : choraLogoLight}
            />
            <div>
              {"chora"}
            </div>
          </Link>
        </div>
        <div className={styles.menu}>
          <ConnectWallet />
          <ThemeButton
            darkTheme={darkTheme}
            toggleTheme={toggleTheme}
          />
        </div>
      </div>
    </div>
  )
}

export default Header
