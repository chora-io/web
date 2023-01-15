import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import GetData from "../../components/store/GetData"
import PostData from "../../components/store/PostData"

import * as styles from "./index.module.css"

const Store = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <div className={styles.section}>
          <div>
            {"post data to server"}
          </div>
          <PostData />
        </div>
        <div className={styles.section}>
          <div>
            {"get data from server"}
          </div>
          <GetData />
        </div>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default Store
