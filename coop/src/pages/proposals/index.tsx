import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import Proposal from "../../components/proposals/Proposal"
import Proposals from "../../components/proposals/Proposals"
import ProposalsNav from "../../components/proposals/ProposalsNav"
import ProposalVote from "../../components/proposals/ProposalVote"
import ProposalVotes from "../../components/proposals/ProposalVotes"

import * as styles from "./index.module.css"

const ProposalsPage = ({ location }) => {

  const urlParams = new URLSearchParams(location["search"])
  const proposalId = urlParams.get("id")
  const voterAddress = urlParams.get("voter")

  return (
    <Main>
      <div className={styles.page}>
        {!proposalId && !voterAddress && (
          <div>
            <h1>
              {"group proposals"}
            </h1>
            <ProposalsNav />
            <Proposals />
          </div>
        )}
        {proposalId && !voterAddress && (
          <div>
            <h1>
              {"group proposal"}
            </h1>
            <Proposal
              proposalId={proposalId}
            />
            <h1>
              {"group proposal votes"}
            </h1>
            <ProposalVotes
              proposalId={proposalId}
            />
          </div>
        )}
        {proposalId && voterAddress && (
          <div>
            <h1>
              {"group proposal vote"}
            </h1>
            <ProposalVote
              proposalId={proposalId}
              voterAddress={voterAddress}
            />
          </div>
        )}
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default ProposalsPage
