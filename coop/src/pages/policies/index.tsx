import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import Authz from "../../components/Authz"
import Feegrant from "../../components/Feegrant"
import Policies from "../../components/policies/Policies"
import Policy from "../../components/policies/Policy"

import * as styles from "./index.module.css"

const PoliciesPage = ({ location }) => {

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
              <Policy policyAddress={policyAddress} />
            </div>
            <h1>
              {"authorizations"}
            </h1>
            <div className={styles.section}>
              <Authz address={policyAddress} />
            </div>
            <h1>
              {"fee allowances"}
            </h1>
            <div className={styles.section}>
              <Feegrant address={policyAddress} />
            </div>
          </div>
        ) : (
          <div>
            <h1>
              {"group policies"}
            </h1>
            <div className={styles.section}>
              <Policies />
            </div>
          </div>
        )}
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default PoliciesPage
