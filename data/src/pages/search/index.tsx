import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import Resolvers from "../../components/search/Resolvers"

import * as styles from "./index.module.css"

const ExplorePage = ({ location }) => (
  <Main location={location}>
    <div className={styles.page}>
      <div>
        <Resolvers />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default ExplorePage
