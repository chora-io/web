import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import MsgExec from "../../components/proposal/MsgExec"
import MsgSubmitProposal from "../../components/proposal/MsgSubmitProposal"
import MsgVote from "../../components/proposal/MsgVote"
import MsgWithdrawProposal from "../../components/proposal/MsgWithdrawProposal"
import QueryProposal from "../../components/proposal/QueryProposal"

import * as styles from "./index.module.css"

const ProposalPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <div className={styles.section}>
          <div>
            {"submit proposal"}
          </div>
          <MsgSubmitProposal />
        </div>
        <div className={styles.section}>
          <div>
            {"withdraw proposal"}
          </div>
          <MsgWithdrawProposal />
        </div>
        <div className={styles.section}>
          <div>
            {"vote on proposal"}
          </div>
          <MsgVote />
        </div>
        <div className={styles.section}>
          <div>
            {"execute proposal"}
          </div>
          <MsgExec />
        </div>
        <div className={styles.section}>
          <div>
            {"search proposal"}
          </div>
          <QueryProposal />
        </div>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default ProposalPage
