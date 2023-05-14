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
              <Link to="/data/convert" activeClassName={styles.active}>
                {"convert"}
              </Link>
            </li>
            <li>
              <Link to="/data/anchor" activeClassName={styles.active}>
                {"anchor"}
              </Link>
            </li>
            <li>
              <Link to="/data/attest" activeClassName={styles.active}>
                {"attest"}
              </Link>
            </li>
            <li>
              <Link to="/data/register" activeClassName={styles.active}>
                {"register"}
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
              <Link to="/geonode/create" activeClassName={styles.active}>
                {"create"}
              </Link>
            </li>
            <li>
              <Link to="/geonode/update" activeClassName={styles.active}>
                {"update"}
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
              <Link to="/group/create" activeClassName={styles.active}>
                {"create"}
              </Link>
            </li>
            <li>
              <Link to="/group/update" activeClassName={styles.active}>
                {"update"}
              </Link>
            </li>
            <li>
              <Link to="/group/policy" activeClassName={styles.active}>
                {"policy"}
              </Link>
            </li>
            <li>
              <Link to="/group/proposal" activeClassName={styles.active}>
                {"proposal"}
              </Link>
            </li>
          </ul>
        )}
      </ul>
    </div>
  )
}

export default Sidebar
