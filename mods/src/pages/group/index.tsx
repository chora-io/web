import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import * as styles from "./index.module.css"

const GroupPage = ({ location }) => (
  <Main location={location}>
    <div className={styles.page}>
      <div>
        <h1>
          {"group module"}
        </h1>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default GroupPage