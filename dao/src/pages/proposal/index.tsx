import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"
import MsgSubmitProposal from "../../components/proposal/MsgSubmitProposal"
import MsgWithdrawProposal from "../../components/proposal/MsgWithdrawProposal"
import MsgVote from "../../components/proposal/MsgVote"
import MsgExec from "../../components/proposal/MsgExec"
import QueryProposal from "../../components/proposal/QueryProposal"

import * as styles from "./index.module.css"

const Proposal = () => {

  // ...

  return (
    <Main>
      <div className={styles.container}>
        <div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"submit proposal"}
            </div>
            <MsgSubmitProposal />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"withdraw proposal"}
            </div>
            <MsgWithdrawProposal />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"vote on proposal"}
            </div>
            <MsgVote />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"execute proposal"}
            </div>
            <MsgExec />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"search proposal"}
            </div>
            <QueryProposal />
          </div>
        </div>
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default Proposal
