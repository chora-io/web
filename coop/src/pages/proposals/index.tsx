import * as React from "react"

import Main from "../../layouts/Main"
import GroupProposals from "../../components/proposals/GroupProposals";
import Seo from "../../components/Seo"

import * as styles from "./index.module.css"

const Proposals = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"group proposals"}
        </h1>
        <div className={styles.section}>
          <GroupProposals />
        </div>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default Proposals
