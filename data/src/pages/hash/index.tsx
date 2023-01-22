import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import GenerateHash from "../../components/hash/GenerateHash"

import * as styles from "./index.module.css"

const HashPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <div className={styles.section}>
          <div>
            {"generate hash"}
          </div>
          <GenerateHash />
        </div>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default HashPage
