import * as React from "react"
import { Link, navigate } from "gatsby"

import SelectNetwork from "./SelectNetwork"

import icon from "chora/assets/images/chora_dark_icon.png"

import * as styles from "./Header.module.css"

const Header = ({ location }) => {
  let local: boolean
  let page: string

  if (typeof window !== "undefined" && (
      window.location.hostname == "0.0.0.0" ||
      window.location.hostname == "127.0.0.1" ||
      window.location.hostname == "localhost"
    )
  ) {
    local = true
    page = location.pathname.split("/")[1]
  } else {
    page = location.pathname.split("/")[2]
  }

  let network: string
  switch (page) {
      case "testnet":
        network = "chora-testnet-1"
        break
      case "local":
        network = "local-testnet"
        break
      case "regen":
        network = "regen-1"
        break
      case "redwood":
        network = "regen-redwood-1"
        break
      default:
        network = ""
        break
  }

  let nextPage: string
  const handleSetNetwork = async nextNetwork => {
    switch (nextNetwork) {
      case "chora-local":
        nextPage = "local"
        break
      case "chora-testnet-1":
        nextPage = "testnet"
        break
      case "regen-1":
        nextPage = "regen"
        break
      case "regen-redwood-1":
        nextPage = "redwood"
        break
      default:
        nextPage = ""
        break
  }
    await navigate(`/${nextPage}`)
  }

  return (
    <div className={styles.header}>
      <div>
        <div className={styles.title}>
          <Link to={local ? "http://" + window.location.hostname + ":8000" : "https://chora.io"}>
            <img src={icon} />
            <div>
              {"chora"}
            </div>
          </Link>
        </div>
        <div className={styles.network}>
          <SelectNetwork
            label=" "
            network={network}
            setNetwork={handleSetNetwork}
          />
        </div>
      </div>
    </div>
  )
}

export default Header
