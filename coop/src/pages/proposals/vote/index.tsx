import * as React from "react"

import Main from "../../../layouts/Main"
import Seo from "../../../components/SeoWrapper"

import VoteOnProposal from "../../../components/proposals/VoteOnProposal"

import * as styles from "./index.module.css"

const VotePage = ({ location }) => {

  const urlParams = new URLSearchParams(location["search"])
  const proposalId = urlParams.get("id")

  return (
    <Main>
      <div className={styles.page}>
        <div>
          <h1>
            {"vote on proposal"}
          </h1>
          <VoteOnProposal
            proposalId={proposalId}
          />
        </div>
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default VotePage
