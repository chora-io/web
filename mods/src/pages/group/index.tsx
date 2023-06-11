import * as React from "react"

import { groupModule } from "chora/modules"

import Main from "../../layouts/Main"
import MoreInfo from "../../components/MoreInfo"
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
import QueryGroupPoliciesByAdmin from "../../components/group/QueryGroupPoliciesByAdmin"
import QueryGroupPoliciesByGroup from "../../components/group/QueryGroupPoliciesByGroup"
import QueryGroupPolicyInfo from "../../components/group/QueryGroupPolicyInfo"
import QueryGroupsByAdmin from "../../components/group/QueryGroupsByAdmin"
import QueryGroupsByMember from "../../components/group/QueryGroupsByMember"
import QueryProposal from "../../components/group/QueryProposal"
import QueryProposalsByGroupPolicy from "../../components/group/QueryProposalsByGroupPolicy"
import QueryTallyResult from "../../components/group/QueryTallyResult"
import QueryVoteByProposalVoter from "../../components/group/QueryVoteByProposalVoter"
import QueryVotesByProposal from "../../components/group/QueryVotesByProposal"
import QueryVotesByVoter from "../../components/group/QueryVotesByVoter"

import * as styles from "./index.module.css"

const GroupPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"group module"}
        </h1>
        <div className={styles.box}>
          <MoreInfo
            module={groupModule}
          />
          <ul className={styles.boxTable}>
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
              <a href="#query-group-policies-by-admin">
                {'QueryGroupPoliciesByAdmin'}
              </a>
            </li>
            <li>
              <a href="#query-group-policies-by-group">
                {'QueryGroupPoliciesByGroup'}
              </a>
            </li>
            <li>
              <a href="#query-group-policy-info">
                {'QueryGroupPolicyInfo'}
              </a>
            </li>
            <li>
              <a href="#query-groups-by-admin">
                {'QueryGroupsByAdmin'}
              </a>
            </li>
            <li>
              <a href="#query-groups-by-member">
                {'QueryGroupsByMember'}
              </a>
            </li>
            <li>
              <a href="#query-proposal">
                {'QueryProposal'}
              </a>
            </li>
            <li>
              <a href="#query-proposals-by-group-policy">
                {'QueryProposalsByGroupPolicy'}
              </a>
            </li>
            <li>
              <a href="#query-tally-result">
                {'QueryTallyResult'}
              </a>
            </li>
            <li>
              <a href="#query-vote-by-proposal-voter">
                {'QueryVoteByProposalVoter'}
              </a>
            </li>
            <li>
              <a href="#query-votes-by-proposal">
                {'QueryVotesByProposal'}
              </a>
            </li>
            <li>
              <a href="#query-votes-by-voter">
                {'QueryVotesByVoter'}
              </a>
            </li>
          </ul>
        </div>
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
        <QueryGroupPoliciesByAdmin />
        <QueryGroupPoliciesByGroup />
        <QueryGroupPolicyInfo />
        <QueryGroupsByAdmin />
        <QueryGroupsByMember />
        <QueryProposal />
        <QueryProposalsByGroupPolicy />
        <QueryTallyResult />
        <QueryVoteByProposalVoter />
        <QueryVotesByProposal />
        <QueryVotesByVoter />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default GroupPage
