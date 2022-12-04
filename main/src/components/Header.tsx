import * as React from "react"
import { Link } from "gatsby"

import * as styles from "./Header.module.css"
import icon from "../assets/images/chora_dark_icon.png"

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
                {"dao"}
              </a>
            </li>
            <li>
              <a href={"http://" + window.location.hostname + ":8002"}>
                {"data"}
              </a>
            </li>
            <li>
              <a href={"http://" + window.location.hostname + ":8003"}>
                {"scan"}
              </a>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <a href={"/dao"}>
                {"dao"}
              </a>
            </li>
            <li>
              <a href={"/data"}>
                {"data"}
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
