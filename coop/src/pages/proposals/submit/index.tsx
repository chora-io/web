import * as React from "react"
import { Link } from "gatsby"

import Main from "../../../layouts/Main"
import SubmitProposal from "../../../components/proposals/SubmitProposal"
import Seo from "../../../components/SeoWrapper"

import * as styles from "./index.module.css"

const Submit = () => (
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

export default Submit
