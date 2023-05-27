import * as React from "react"
import { useState } from "react"
import { Link, navigate } from "gatsby"

import * as styles from "./Sidebar.module.css"

const Sidebar = ({ location }) => {
  let defaultActive: string
  if (typeof window !== "undefined" && (
      window.location.hostname == "0.0.0.0" ||
      window.location.hostname == "127.0.0.1" ||
      window.location.hostname == "localhost"
    )
  ) {
    defaultActive = location.pathname.split("/")[1]
  } else {
    defaultActive = location.pathname.split("/")[2]
  }

  const [active, setActive] = useState<string>(defaultActive)

  const handleSetActive = (key: string) => {
    if (key === "") {
      setActive(key)
      navigate("/")
    }
    if (active === key) {
      setActive("")
    } else {
      setActive(key)
    }
  }

  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <button className={defaultActive === "" ? styles.active : styles.button} onClick={() => handleSetActive("")}>
            {"home"}
          </button>
        </li>
        <li>
          <button className={defaultActive === "data" ? styles.active : styles.button} onClick={() => handleSetActive("data")}>
            {"data"}
          </button>
        </li>
        {active === "data" && (
          <ul>
            <li>
              <Link to="/data/msg" activeClassName={styles.active}>
                {"msg service"}
              </Link>
            </li>
            <li>
              <Link to="/data/query" activeClassName={styles.active}>
                {"query service"}
              </Link>
            </li>
          </ul>
        )}
        <li>
          <button className={defaultActive === "geonode" ? styles.active : styles.button} onClick={() => handleSetActive("geonode")}>
            {"geonode"}
          </button>
        </li>
        {active === "geonode" && (
          <ul>
            <li>
              <Link to="/geonode/msg" activeClassName={styles.active}>
                {"msg service"}
              </Link>
            </li>
            <li>
              <Link to="/geonode/query" activeClassName={styles.active}>
                {"query service"}
              </Link>
            </li>
          </ul>
        )}
        <li>
          <button className={defaultActive === "group" ? styles.active : styles.button} onClick={() => handleSetActive("group")}>
            {"group"}
          </button>
        </li>
        {active === "group" && (
          <ul>
            <li>
              <Link to="/group/msg" activeClassName={styles.active}>
                {"msg service"}
              </Link>
            </li>
            <li>
              <Link to="/group/query" activeClassName={styles.active}>
                {"query service"}
              </Link>
            </li>
          </ul>
        )}
      </ul>
    </div>
  )
}

export default Sidebar
