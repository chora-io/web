import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import MsgCreateGroupPolicy from "../../components/policy/MsgCreateGroupPolicy"
import MsgUpdateGroupPolicyAdmin from "../../components/policy/MsgUpdateGroupPolicyAdmin"
import MsgUpdateGroupPolicyDecisionPolicy from "../../components/policy/MsgUpdateGroupPolicyDecisionPolicy"
import MsgUpdateGroupPolicyMetadata from "../../components/policy/MsgUpdateGroupPolicyMetadata"
import QueryGroupPolicy from "../../components/policy/QueryGroupPolicy"

import * as styles from "./index.module.css"

const PolicyPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <div className={styles.section}>
          <div>
            {"create policy"}
          </div>
          <MsgCreateGroupPolicy />
        </div>
        <div className={styles.section}>
          <div>
            {"update policy admin"}
          </div>
          <MsgUpdateGroupPolicyAdmin />
        </div>
        <div className={styles.section}>
          <div>
            {"update policy metadata"}
          </div>
          <MsgUpdateGroupPolicyMetadata />
        </div>
        <div className={styles.section}>
          <div>
            {"update decision policy"}
          </div>
          <MsgUpdateGroupPolicyDecisionPolicy />
        </div>
        <div className={styles.section}>
          <div>
            {"search policy"}
          </div>
          <QueryGroupPolicy />
        </div>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default PolicyPage
