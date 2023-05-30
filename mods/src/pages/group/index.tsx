import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import MsgCreateGroup from "../../components/group/MsgCreateGroup"
import MsgCreateGroupWithPolicy from "../../components/group/MsgCreateGroupWithPolicy"
import MsgCreateGroupPolicy from "../../components/group/MsgCreateGroupPolicy"
import MsgExec from "../../components/group/MsgExec"
import MsgLeaveGroup from "../../components/group/MsgLeaveGroup"
import MsgSubmitProposal from "../../components/group/MsgSubmitProposal"
import MsgUpdateGroupAdmin from "../../components/group/MsgUpdateGroupAdmin"
import MsgUpdateGroupMembers from "../../components/group/MsgUpdateGroupMembers"
import MsgUpdateGroupMetadata from "../../components/group/MsgUpdateGroupMetadata"
import MsgUpdateGroupPolicyAdmin from "../../components/group/MsgUpdateGroupPolicyAdmin"
import MsgUpdateGroupPolicyDecisionPolicy from "../../components/group/MsgUpdateGroupPolicyDecisionPolicy"
import MsgUpdateGroupPolicyMetadata from "../../components/group/MsgUpdateGroupPolicyMetadata"
import MsgVote from "../../components/group/MsgVote"
import MsgWithdrawProposal from "../../components/group/MsgWithdrawProposal"
import QueryGroup from "../../components/group/QueryGroup"
import QueryGroupMembers from "../../components/group/QueryGroupMembers"
import QueryGroupPolicy from "../../components/group/QueryGroupPolicy"
import QueryProposal from "../../components/group/QueryProposal"

import * as styles from "./index.module.css"

const GroupPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"group module"}
        </h1>
        <MsgCreateGroup />
        <MsgCreateGroupWithPolicy />
        <MsgCreateGroupPolicy />
        <MsgExec />
        <MsgLeaveGroup />
        <MsgSubmitProposal />
        <MsgUpdateGroupAdmin />
        <MsgUpdateGroupMembers />
        <MsgUpdateGroupMetadata />
        <MsgUpdateGroupPolicyAdmin />
        <MsgUpdateGroupPolicyMetadata />
        <MsgUpdateGroupPolicyDecisionPolicy />
        <MsgVote />
        <MsgWithdrawProposal />
        <QueryGroup />
        <QueryGroupMembers />
        <QueryGroupPolicy />
        <QueryProposal />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default GroupPage
