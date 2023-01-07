import * as React from "react"

import Main from "../layouts/Main"
import Seo from "../components/Seo"

import Faucet from "../components/Faucet"

import * as styles from "./index.module.css"

const Index = () => (
  <Main>
    <div className={styles.page}>
      <Faucet />
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default Index
