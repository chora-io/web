import * as React from "react"

import Main from "../../../layouts/Main"
import Seo from "../../../components/SeoWrapper"

import MsgCreateGroup from "../../../components/group/msg/MsgCreateGroup"
import MsgCreateGroupWithPolicy from "../../../components/group/msg/MsgCreateGroupWithPolicy"
import MsgCreateGroupPolicy from "../../../components/group/msg/MsgCreateGroupPolicy"
import MsgExec from "../../../components/group/msg/MsgExec"
import MsgLeaveGroup from "../../../components/group/msg/MsgLeaveGroup"
import MsgSubmitProposal from "../../../components/group/msg/MsgSubmitProposal"
import MsgUpdateGroupAdmin from "../../../components/group/msg/MsgUpdateGroupAdmin"
import MsgUpdateGroupMembers from "../../../components/group/msg/MsgUpdateGroupMembers"
import MsgUpdateGroupMetadata from "../../../components/group/msg/MsgUpdateGroupMetadata"
import MsgUpdateGroupPolicyAdmin from "../../../components/group/msg/MsgUpdateGroupPolicyAdmin"
import MsgUpdateGroupPolicyDecisionPolicy from "../../../components/group/msg/MsgUpdateGroupPolicyDecisionPolicy"
import MsgUpdateGroupPolicyMetadata from "../../../components/group/msg/MsgUpdateGroupPolicyMetadata"
import MsgVote from "../../../components/group/msg/MsgVote"
import MsgWithdrawProposal from "../../../components/group/msg/MsgWithdrawProposal"

import * as styles from "./index.module.css"

const GroupMsgPage = ({ location }) => (
  <Main location={location}>
    <div className={styles.page}>
      <div>
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
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default GroupMsgPage
