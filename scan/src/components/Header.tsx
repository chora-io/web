import * as React from "react"
import { Link, navigate } from "gatsby"

import SelectNetwork from "./SelectNetwork"
import ThemeButton from "chora/components/ThemeButton"

import choraLogoDark from "chora/assets/images/chora_dark_icon.png"
import choraLogoLight from "chora/assets/images/chora_light_icon.png"

import * as styles from "./Header.module.css"

const Header = ({ location, darkTheme, toggleTheme }) => {
  let local: boolean
  let network: string

  if (typeof window !== "undefined" && (
      window.location.hostname == "0.0.0.0" ||
      window.location.hostname == "127.0.0.1" ||
      window.location.hostname == "localhost"
    )
  ) {
    local = true
    network = location.pathname.split("/")[1]
  } else {
    network = location.pathname.split("/")[2]
  }

  const handleSetNetwork = async nextNetwork => {
    await navigate(`/${nextNetwork}`)
  }

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
          <SelectNetwork
            label=" "
            network={network}
            setNetwork={handleSetNetwork}
          />
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
