import * as React from "react"

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
        {local ? (
          <ul>
            <li>
              <a href={"http://" + window.location.hostname + ":8002"}>
                {"data"}
              </a>
            </li>
            <li>
              <a href={"http://" + window.location.hostname + ":8001"}>
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
