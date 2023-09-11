import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import DataResolvers from "../../components/search/DataResolvers"
import AnchoredData from "../../components/search/AnchoredData"

import * as styles from "./index.module.css"

const ExplorePage = ({ location }) => (
  <Main location={location}>
    <div className={styles.page}>
      <div>
        <AnchoredData />
        <DataResolvers />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default ExplorePage
