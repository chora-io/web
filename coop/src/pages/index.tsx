import * as React from "react"

import Main from "../layouts/Main"
import Group from "../components/home/Group"
import Seo from "../components/SeoWrapper"

import * as styles from "./index.module.css"

const HomePage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"group information"}
        </h1>
        <Group />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default HomePage
