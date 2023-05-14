import * as React from "react"

import Main from "../../../layouts/Main"
import Seo from "../../../components/SeoWrapper"

import MsgCreateGroupPolicy from "../../../components/group/policy/MsgCreateGroupPolicy"
import MsgUpdateGroupPolicyAdmin from "../../../components/group/policy/MsgUpdateGroupPolicyAdmin"
import MsgUpdateGroupPolicyDecisionPolicy from "../../../components/group/policy/MsgUpdateGroupPolicyDecisionPolicy"
import MsgUpdateGroupPolicyMetadata from "../../../components/group/policy/MsgUpdateGroupPolicyMetadata"
import QueryGroupPolicy from "../../../components/group/policy/QueryGroupPolicy"

import * as styles from "./index.module.css"

const PolicyPage = ({ location }) => (
  <Main location={location}>
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
