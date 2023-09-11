import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import Authenticate from "../../components/server/Authenticate"
import GetData from "../../components/server/GetData"
import PostData from "../../components/server/PostData"

import * as styles from "./index.module.css"

const ServerPage = ({ location }) => (
  <Main location={location}>
    <div className={styles.page}>
      <div>
        <Authenticate />
        <GetData />
        <PostData />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default ServerPage
