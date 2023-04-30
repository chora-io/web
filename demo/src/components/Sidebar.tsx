import * as React from "react"
import { useState } from "react"
import { Link, navigate } from "gatsby"

import * as styles from "./Sidebar.module.css"

const Sidebar = () => {
  const [active, setActive] = useState<string>(location.pathname.split("/")[1])

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
          <button className={styles.button} onClick={() => handleSetActive("")}>
            {"home"}
          </button>
        </li>
        <li>
          <button className={styles.button} onClick={() => handleSetActive("data")}>
            {"data"}
          </button>
        </li>
        {active === "data" && (
          <ul>
            <li>
              <Link to="/data/hash" activeClassName={styles.active}>
                {"hash"}
              </Link>
            </li>
            <li>
              <Link to="/data/store" activeClassName={styles.active}>
                {"store"}
              </Link>
            </li>
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
          <button className={styles.button} onClick={() => handleSetActive("geonode")}>
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
          <button className={styles.button} onClick={() => handleSetActive("group")}>
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
