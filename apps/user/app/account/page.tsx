'use client'

// import { Metadata } from 'next'

import Auth from "@components/account/Auth"
import Email from "@components/account/Email"
import Login from "@components/account/Login"
import Keplr from "@components/account/Keplr"
import Switch from "@components/account/Switch"

import styles from "./page.module.css"

// export const metadata: Metadata = {
//   title: "account",
// }

const AccountPage = () => (
  <div className={styles.page}>
    <div>
      <Switch />
      <Auth />
      <Keplr />
      <Email />
      <Login />
    </div>
  </div>
)

export default AccountPage
