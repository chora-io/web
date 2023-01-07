import * as React from "react"
import { Link } from "gatsby"

import icon from "chora/assets/images/chora_dark_icon.png"

import * as styles from "./Header.module.css"

const Header = () => {

  let local = false
  if (typeof window !== "undefined" && (
      window.location.hostname == "0.0.0.0" ||
      window.location.hostname == "127.0.0.1" ||
      window.location.hostname == "localhost"
    )
  ) { local = true }

  return (
    <div className={styles.header}>
      <div className={styles.menu}>
        <ul>
          <li>
            <Link to="/">
              <div className={styles.title}>
                <img src={icon} />
                <div>
                  {"chora"}
                </div>
              </div>
            </Link>
          </li>
        </ul>
        {local ? (
          <ul>
            <li>
              <a href={"http://" + window.location.hostname + ":8001"}>
                {"data"}
              </a>
            </li>
            <li>
              <a href={"http://" + window.location.hostname + ":8002"}>
                {"group"}
              </a>
            </li>
            <li>
              <a href={"http://" + window.location.hostname + ":8003"}>
                {"node"}
              </a>
            </li>
            <li>
              <a href={"http://" + window.location.hostname + ":8004"}>
                {"scan"}
              </a>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <a href={"/data"}>
                {"data"}
              </a>
            </li>
            <li>
              <a href={"/group"}>
                {"group"}
              </a>
            </li>
            <li>
              <a href={"/node"}>
                {"node"}
              </a>
            </li>
            <li>
              <a href={"/scan"}>
                {"scan"}
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default Header
