import * as React from "react"

import Main from "../layouts/Main"
import GroupInfo from "../components/home/GroupInfo";
import Seo from "../components/SeoWrapper"

import * as styles from "./index.module.css"

const Home = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"group information"}
        </h1>
        <div className={styles.section}>
          <GroupInfo />
        </div>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default Home
