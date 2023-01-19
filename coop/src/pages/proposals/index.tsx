import * as React from "react"
import { Link } from "gatsby"

import Main from "../../layouts/Main"
import GroupProposal from "../../components/proposals/GroupProposal"
import GroupProposals from "../../components/proposals/GroupProposals"
import GroupProposalVote from "../../components/proposals/GroupProposalVote"
import GroupProposalVotes from "../../components/proposals/GroupProposalVotes"
import Seo from "../../components/SeoWrapper"

import * as styles from "./index.module.css"

const Proposals = ({ location }) => {

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
            <div className={styles.link}>
              <Link to="/proposals/submit">
                {"new proposal"}
              </Link>
            </div>
            <div className={styles.section}>
              <GroupProposals />
            </div>
          </div>
        )}
        {proposalId && !voterAddress && (
          <div>
            <h1>
              {"group proposal"}
            </h1>
            <div className={styles.section}>
              <GroupProposal
                proposalId={proposalId}
              />
            </div>
            <h1>
              {"group proposal votes"}
            </h1>
            <div className={styles.section}>
              <GroupProposalVotes
                proposalId={proposalId}
              />
            </div>
          </div>
        )}
        {proposalId && voterAddress && (
          <div>
            <h1>
              {"group proposal vote"}
            </h1>
            <div className={styles.section}>
              <GroupProposalVote
                proposalId={proposalId}
                voterAddress={voterAddress}
              />
            </div>
          </div>
        )}
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default Proposals
