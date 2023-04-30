import * as React from "react"

import Main from "../../../layouts/Main"
import Seo from "../../../components/SeoWrapper"

import MsgExec from "../../../components/group/proposal/MsgExec"
import MsgSubmitProposal from "../../../components/group/proposal/MsgSubmitProposal"
import MsgVote from "../../../components/group/proposal/MsgVote"
import MsgWithdrawProposal from "../../../components/group/proposal/MsgWithdrawProposal"
import QueryProposal from "../../../components/group/proposal/QueryProposal"

import * as styles from "./index.module.css"

const ProposalPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <MsgSubmitProposal />
        <MsgWithdrawProposal />
        <MsgVote />
        <MsgExec />
        <QueryProposal />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default ProposalPage
