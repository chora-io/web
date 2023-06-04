import * as React from "react"
import { useContext } from "react"
import { Link } from "gatsby"

import { WalletContext } from "chora"

import * as styles from "./Sidebar.module.css"

const Sidebar = () => {
  const { network } = useContext(WalletContext)

  if (network === 'chora-local' || network === 'chora-testnet-1') {
    return (
      <div className={styles.sidebar}>
        <ul>
          <li>
            <Link to="/" activeClassName={styles.active}>
              {"home"}
            </Link>
          </li>
          <li>
            <Link to="/data" activeClassName={styles.active}>
              {"data"}
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

  if (network === 'regen-1' || network === 'regen-local' || network === 'regen-redwood-1') {
    return (
      <div className={styles.sidebar}>
        <ul>
          <li>
            <Link to="/" activeClassName={styles.active}>
              {"home"}
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
