import * as React from "react";

import Main from "../layouts/Main"
import Seo from "../components/Seo"
import Background from "../components/Background"
import Chains from "../components/home/Chains"

import * as styles from "./index.module.css"

const Index = () => (
  <Main>
    <div className={styles.container} >
      <Chains />
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default Index
