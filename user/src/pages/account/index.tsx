import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import Auth from "../../components/account/Auth"
import Email from "../../components/account/Email"
import Login from "../../components/account/Login"
import Keplr from "../../components/account/Keplr"
import Switch from "../../components/account/Switch"

import * as styles from "./index.module.css"

const AccountPage = ({ location }) => (
  <Main location={location}>
    <div className={styles.page}>
      <div>
        <Switch />
        <Auth />
        <Keplr />
        <Email />
        <Login />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default AccountPage
