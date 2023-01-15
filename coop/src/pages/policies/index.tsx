import * as React from "react"

import Main from "../../layouts/Main"
import GroupPolicies from "../../components/policies/GroupPolicies";
import Seo from "../../components/SeoWrapper"

import * as styles from "./index.module.css"

const Policies = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"group policies"}
        </h1>
        <div className={styles.section}>
          <GroupPolicies />
        </div>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default Policies
