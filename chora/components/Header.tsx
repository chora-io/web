import * as React from "react"
import { Link } from "gatsby"

import ConnectWallet from "./ConnectWallet"
import ThemeButton from "./ThemeButton"

import choraLogoDark from "../assets/images/chora_dark_icon.png"
import choraLogoLight from "../assets/images/chora_light_icon.png"

import * as styles from "./Header.module.css"

const Header = ({ context, darkTheme, toggleTheme }: any) => {

  let local = false
  if (typeof window !== "undefined" && (
      window.location.hostname == "0.0.0.0" ||
      window.location.hostname == "127.0.0.1" ||
      window.location.hostname == "localhost"
    )
  ) { local = true }

  return (
    <div className={styles.header}>
      <div>
        <div className={styles.title}>
          <Link to={local ? "http://" + window.location.hostname + ":8000" : "https://chora.io"}>
            <img src={darkTheme ? choraLogoDark : choraLogoLight} />
            <div>
              {"chora"}
            </div>
          </Link>
        </div>
        <div className={styles.menu}>
          {context && (
            <ConnectWallet {...context} />
          )}
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
