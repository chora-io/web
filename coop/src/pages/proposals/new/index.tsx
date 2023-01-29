import * as React from "react"

import Main from "../../../layouts/Main"
import Seo from "../../../components/SeoWrapper"

import SubmitProposal from "../../../components/proposals/SubmitProposal"

import * as styles from "./index.module.css"

const ProposalsNewPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"new proposal"}
        </h1>
        <SubmitProposal />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default ProposalsNewPage
