import * as React from "react"

import Main from "../../layouts/Main"
import GroupPolicies from "../../components/policies/GroupPolicies"
import GroupPolicy from "../../components/policies/GroupPolicy"
import Seo from "../../components/SeoWrapper"

import * as styles from "./index.module.css"

const Policies = () => {

  const urlParams = new URLSearchParams(location["search"])
  const policyAddress = urlParams.get("address")

  return (
    <Main>
      <div className={styles.page}>
        {policyAddress ? (
          <div>
            <h1>
              {"group policy"}
            </h1>
            <div className={styles.section}>
              <GroupPolicy policyAddress={policyAddress} />
            </div>
          </div>
        ) : (
          <div>
            <h1>
              {"group policies"}
            </h1>
            <div className={styles.section}>
              <GroupPolicies />
            </div>
          </div>
        )}
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default Policies
