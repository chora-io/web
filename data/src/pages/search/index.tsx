import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import Search from "../../components/search/Search"

import * as styles from "./index.module.css"

const ExplorePage = ({ location }) => (
  <Main location={location}>
    <div className={styles.page}>
      <div>
        <Search />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default ExplorePage
