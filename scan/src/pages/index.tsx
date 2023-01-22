import * as React from "react"

import Main from "../layouts/Main"
import Seo from "../components/SeoWrapper"

import Chains from "../components/home/Chains"

import * as styles from "./index.module.css"

const HomePage = () => (
  <Main>
    <div className={styles.page}>
      <Chains />
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default HomePage
