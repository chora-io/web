import * as React from "react"

import Main from "../../layouts/Main"
import GroupProposal from "../../components/proposals/GroupProposal"
import GroupProposals from "../../components/proposals/GroupProposals"
import Seo from "../../components/SeoWrapper"

import * as styles from "./index.module.css"

const Proposals = ({ location }) => {

  const urlParams = new URLSearchParams(location["search"])
  const proposalId = urlParams.get("id")

  return (
    <Main>
      <div className={styles.page}>
        {proposalId ? (
          <div>
            <h1>
              {"group proposal"}
            </h1>
            <div className={styles.section}>
              <GroupProposal
                proposalId={proposalId}
              />
            </div>
          </div>
        ) : (
          <div>
            <h1>
              {"group proposals"}
            </h1>
            <div className={styles.section}>
              <GroupProposals />
            </div>
          </div>
        )}
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default Proposals
