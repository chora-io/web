import * as React from "react"

import Main from "../../../layouts/Main"
import Seo from "../../../components/SeoWrapper"

import SubmitProposal from "../../../components/proposals/SubmitProposal"

import * as styles from "./index.module.css"

const SubmitPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"submit proposal"}
        </h1>
        <div className={styles.section}>
          <SubmitProposal />
        </div>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default SubmitPage
