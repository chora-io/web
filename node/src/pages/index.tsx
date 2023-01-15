import * as React from "react"

import Main from "../layouts/Main"
import Seo from "../components/Seo"

import FaucetWrapper from "../components/FaucetWrapper"

import * as styles from "./index.module.css"

const Home = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"node demo application"}
        </h1>
        <FaucetWrapper />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default Home
