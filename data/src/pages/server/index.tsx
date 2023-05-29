import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import GetData from "../../components/server/GetData"
import PostData from "../../components/server/PostData"

import * as styles from "./index.module.css"

const StorePage = ({ location }) => (
  <Main location={location}>
    <div className={styles.page}>
      <div>
        <PostData />
        <GetData />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default StorePage
