import * as React from "react"

import Main from "../layouts/Main"
import Seo from "../components/Seo"

import * as styles from "./index.module.css"

const Index = () => (
  <Main>
    <div className={styles.container} >
      <h1>
        {"data anchoring and attestations"}
      </h1>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default Index
