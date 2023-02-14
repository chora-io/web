import * as React from "react"

import Main from "../../../layouts/Main"
import Seo from "../../../components/SeoWrapper"

import SubmitApplication from "../../../components/members/SubmitApplication"

import * as styles from "./index.module.css"

const MembersNewPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"submit application"}
        </h1>
        <SubmitApplication />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default MembersNewPage
