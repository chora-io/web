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
        <MsgCreateGroupPolicy />
        <MsgUpdateGroupPolicyAdmin />
        <MsgUpdateGroupPolicyMetadata />
        <MsgUpdateGroupPolicyDecisionPolicy />
        <QueryGroupPolicy />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default PolicyPage
