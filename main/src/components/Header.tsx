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
      <div>
        <div className={styles.title}>
          <Link to="/">
            <img src={icon} />
            <div>
              {"chora"}
            </div>
          </Link>
        </div>
        {local ? (
          <ul className={styles.menu}>
            <li>
              <Link to={"http://" + window.location.hostname + ":8001"}>
                {"coop"}
              </Link>
            </li>
            <li>
              <Link to={"http://" + window.location.hostname + ":8002"}>
                {"data"}
              </Link>
            </li>
            <li>
              <Link to={"http://" + window.location.hostname + ":8003"}>
                {"group"}
              </Link>
            </li>
            <li>
              <Link to={"http://" + window.location.hostname + ":8004"}>
                {"node"}
              </Link>
            </li>
            <li>
              <Link to={"http://" + window.location.hostname + ":8005"}>
                {"scan"}
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/coop">
                {"coop"}
              </Link>
            </li>
            <li>
              <Link to="/data">
                {"data"}
              </Link>
            </li>
            <li>
              <Link to="/group">
                {"group"}
              </Link>
            </li>
            <li>
              <Link to="/node">
                {"node"}
              </Link>
            </li>
            <li>
              <Link to="/scan">
                {"scan"}
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default Header
