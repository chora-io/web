import * as React from "react"
import { useContext } from "react"
import { Link } from "gatsby"

import { WalletContext } from "chora"

import * as styles from "./Sidebar.module.css"

const Sidebar = () => {
  const { network } = useContext(WalletContext)

  if (network !== undefined && network.includes("chora")) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <li>
            <Link to="/" activeClassName={styles.active}>
              {"home"}
            </Link>
          </li>
          <li>
            <Link to="/authz" activeClassName={styles.active}>
              {"authz"}
            </Link>
          </li>
          <li>
            <Link to="/bank" activeClassName={styles.active}>
              {"bank"}
            </Link>
          </li>
          <li>
            <Link to="/data" activeClassName={styles.active}>
              {"data"}
            </Link>
          </li>
          <li>
            <Link to="/feegrant" activeClassName={styles.active}>
              {"feegrant"}
            </Link>
          </li>
          <li>
            <Link to="/geonode" activeClassName={styles.active}>
              {"geonode"}
            </Link>
          </li>
          <li>
            <Link to="/group" activeClassName={styles.active}>
              {"group"}
            </Link>
          </li>
          <li>
            <Link to="/intertx" activeClassName={styles.active}>
              {"intertx"}
            </Link>
          </li>
          <li>
            <Link to="/voucher" activeClassName={styles.active}>
              {"voucher"}
            </Link>
          </li>
        </ul>
      </div>
    )
  }

  if (network !== undefined && network.includes("regen")) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <li>
            <Link to="/" activeClassName={styles.active}>
              {"home"}
            </Link>
          </li>
          <li>
            <Link to="/authz" activeClassName={styles.active}>
              {"authz"}
            </Link>
          </li>
          <li>
            <Link to="/bank" activeClassName={styles.active}>
              {"bank"}
            </Link>
          </li>
          <li>
            <Link to="/data" activeClassName={styles.active}>
              {"data"}
            </Link>
          </li>
          <li>
            <Link to="/ecocredit" activeClassName={styles.active}>
              {"ecocredit"}
            </Link>
          </li>
          <li>
            <Link to="/feegrant" activeClassName={styles.active}>
              {"feegrant"}
            </Link>
          </li>
          <li>
            <Link to="/group" activeClassName={styles.active}>
              {"group"}
            </Link>
          </li>
          <li>
            <Link to="/intertx" activeClassName={styles.active}>
              {"intertx"}
            </Link>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <Link to="/" activeClassName={styles.active}>
            {"home"}
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
