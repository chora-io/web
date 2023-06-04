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
import QueryGroupInfo from "../../components/group/QueryGroupInfo"
import QueryGroupMembers from "../../components/group/QueryGroupMembers"
import QueryGroupPolicyInfo from "../../components/group/QueryGroupPolicyInfo"
import QueryProposal from "../../components/group/QueryProposal"

import * as styles from "./index.module.css"

const GroupPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"group module"}
        </h1>
        <ul className={styles.table}>
          <li>
            <a href="#msg-create-group">
              {'MsgCreateGroup'}
            </a>
          </li>
          <li>
            <a href="#msg-create-group-with-policy">
              {'MsgCreateGroupWithPolicy'}
            </a>
          </li>
          <li>
            <a href="#msg-create-group-policy">
              {'MsgCreateGroupPolicy'}
            </a>
          </li>
          <li>
            <a href="#msg-exec">
              {'MsgExec'}
            </a>
          </li>
          <li>
            <a href="#msg-leave-group">
              {'MsgLeaveGroup'}
            </a>
          </li>
          <li>
            <a href="#msg-submit-proposal">
              {'MsgSubmitProposal'}
            </a>
          </li>
          <li>
            <a href="#msg-update-group-admin">
              {'MsgUpdateGroupAdmin'}
            </a>
          </li>
          <li>
            <a href="#msg-update-group-members">
              {'MsgUpdateGroupMembers'}
            </a>
          </li>
          <li>
            <a href="#msg-update-group-metadata">
              {'MsgUpdateGroupMetadata'}
            </a>
          </li>
          <li>
            <a href="#msg-update-group-policy-admin">
              {'MsgUpdateGroupPolicyAdmin'}
            </a>
          </li>
          <li>
            <a href="#msg-update-group-policy-decision-policy">
              {'MsgUpdateGroupPolicyDecisionPolicy'}
            </a>
          </li>
          <li>
            <a href="#msg-update-group-policy-metadata">
              {'MsgUpdateGroupPolicyMetadata'}
            </a>
          </li>
          <li>
            <a href="#msg-vote">
              {'MsgVote'}
            </a>
          </li>
          <li>
            <a href="#msg-withdraw-proposal">
              {'MsgWithdrawProposal'}
            </a>
          </li>
          <li>
            <a href="#query-group-info">
              {'QueryGroupInfo'}
            </a>
          </li>
          <li>
            <a href="#query-group-members">
              {'QueryGroupMembers'}
            </a>
          </li>
          <li>
            {'QueryGroupPoliciesByAdmin'}
          </li>
          <li>
            {'QueryGroupPoliciesByGroup'}
          </li>
          <li>
            <a href="#query-group-policy-info">
              {'QueryGroupPolicyInfo'}
            </a>
          </li>
          <li>
            {'QueryGroupsByAdmin'}
          </li>
          <li>
            {'QueryGroupsByMembers'}
          </li>
          <li>
            <a href="#query-proposal">
              {'QueryProposal'}
            </a>
          </li>
          <li>
            {'QueryProposalsByGroupPolicy'}
          </li>
          <li>
            {'QueryTallyResult'}
          </li>
          <li>
            {'QueryVoteByProposalVoter'}
          </li>
          <li>
            {'QueryVotesByProposal'}
          </li>
          <li>
            {'QueryVotesByVoter'}
          </li>
        </ul>
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
        <MsgUpdateGroupPolicyDecisionPolicy />
        <MsgUpdateGroupPolicyMetadata />
        <MsgVote />
        <MsgWithdrawProposal />
        <QueryGroupInfo />
        <QueryGroupMembers />
        <QueryGroupPolicyInfo />
        <QueryProposal />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default GroupPage
