import { Metadata } from 'next'

import ModuleInfo from '@components/modules/cosmos.group.v1/ModuleInfo'
import MsgCreateGroup from '@components/modules/cosmos.group.v1/MsgCreateGroup'
import MsgCreateGroupWithPolicy from '@components/modules/cosmos.group.v1/MsgCreateGroupWithPolicy'
import MsgCreateGroupPolicy from '@components/modules/cosmos.group.v1/MsgCreateGroupPolicy'
import MsgExec from '@components/modules/cosmos.group.v1/MsgExec'
import MsgLeaveGroup from '@components/modules/cosmos.group.v1/MsgLeaveGroup'
import MsgSubmitProposal from '@components/modules/cosmos.group.v1/MsgSubmitProposal'
import MsgUpdateGroupAdmin from '@components/modules/cosmos.group.v1/MsgUpdateGroupAdmin'
import MsgUpdateGroupMembers from '@components/modules/cosmos.group.v1/MsgUpdateGroupMembers'
import MsgUpdateGroupMetadata from '@components/modules/cosmos.group.v1/MsgUpdateGroupMetadata'
import MsgUpdateGroupPolicyAdmin from '@components/modules/cosmos.group.v1/MsgUpdateGroupPolicyAdmin'
import MsgUpdateGroupPolicyDecisionPolicy from '@components/modules/cosmos.group.v1/MsgUpdateGroupPolicyDecisionPolicy'
import MsgUpdateGroupPolicyMetadata from '@components/modules/cosmos.group.v1/MsgUpdateGroupPolicyMetadata'
import MsgVote from '@components/modules/cosmos.group.v1/MsgVote'
import MsgWithdrawProposal from '@components/modules/cosmos.group.v1/MsgWithdrawProposal'
import QueryGroupInfo from '@components/modules/cosmos.group.v1/QueryGroupInfo'
import QueryGroupMembers from '@components/modules/cosmos.group.v1/QueryGroupMembers'
import QueryGroupPoliciesByAdmin from '@components/modules/cosmos.group.v1/QueryGroupPoliciesByAdmin'
import QueryGroupPoliciesByGroup from '@components/modules/cosmos.group.v1/QueryGroupPoliciesByGroup'
import QueryGroupPolicyInfo from '@components/modules/cosmos.group.v1/QueryGroupPolicyInfo'
import QueryGroupsByAdmin from '@components/modules/cosmos.group.v1/QueryGroupsByAdmin'
import QueryGroupsByMember from '@components/modules/cosmos.group.v1/QueryGroupsByMember'
import QueryProposal from '@components/modules/cosmos.group.v1/QueryProposal'
import QueryProposalsByGroupPolicy from '@components/modules/cosmos.group.v1/QueryProposalsByGroupPolicy'
import QueryTallyResult from '@components/modules/cosmos.group.v1/QueryTallyResult'
import QueryVoteByProposalVoter from '@components/modules/cosmos.group.v1/QueryVoteByProposalVoter'
import QueryVotesByProposal from '@components/modules/cosmos.group.v1/QueryVotesByProposal'
import QueryVotesByVoter from '@components/modules/cosmos.group.v1/QueryVotesByVoter'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const ModulePage = () => (
  <div className={styles.page}>
    <h1>{'cosmos.group.v1'}</h1>
    <ModuleInfo />
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
)

export default ModulePage
