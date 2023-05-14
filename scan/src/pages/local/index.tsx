import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import Dashboard from "../../components/dash/Dashboard"

import * as styles from "./index.module.css"

const LocalPage = () => (
  <Main>
    <div className={styles.page}>
      <Dashboard
        chainName="Local Testnet"
        rest="http://127.0.0.1:1317"
      />
    </div>
  </Main>
)

export const Head = () => <Seo title="scan | local testnet" />

export default LocalPage
