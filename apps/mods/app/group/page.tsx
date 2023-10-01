import { Metadata } from 'next'

import ModuleInfo from '@components/group/ModuleInfo'
import MsgCreateGroup from '@components/group/MsgCreateGroup'
import MsgCreateGroupWithPolicy from '@components/group/MsgCreateGroupWithPolicy'
import MsgCreateGroupPolicy from '@components/group/MsgCreateGroupPolicy'
import MsgExec from '@components/group/MsgExec'
import MsgLeaveGroup from '@components/group/MsgLeaveGroup'
import MsgSubmitProposal from '@components/group/MsgSubmitProposal'
import MsgUpdateGroupAdmin from '@components/group/MsgUpdateGroupAdmin'
import MsgUpdateGroupMembers from '@components/group/MsgUpdateGroupMembers'
import MsgUpdateGroupMetadata from '@components/group/MsgUpdateGroupMetadata'
import MsgUpdateGroupPolicyAdmin from '@components/group/MsgUpdateGroupPolicyAdmin'
import MsgUpdateGroupPolicyDecisionPolicy from '@components/group/MsgUpdateGroupPolicyDecisionPolicy'
import MsgUpdateGroupPolicyMetadata from '@components/group/MsgUpdateGroupPolicyMetadata'
import MsgVote from '@components/group/MsgVote'
import MsgWithdrawProposal from '@components/group/MsgWithdrawProposal'
import QueryGroupInfo from '@components/group/QueryGroupInfo'
import QueryGroupMembers from '@components/group/QueryGroupMembers'
import QueryGroupPoliciesByAdmin from '@components/group/QueryGroupPoliciesByAdmin'
import QueryGroupPoliciesByGroup from '@components/group/QueryGroupPoliciesByGroup'
import QueryGroupPolicyInfo from '@components/group/QueryGroupPolicyInfo'
import QueryGroupsByAdmin from '@components/group/QueryGroupsByAdmin'
import QueryGroupsByMember from '@components/group/QueryGroupsByMember'
import QueryProposal from '@components/group/QueryProposal'
import QueryProposalsByGroupPolicy from '@components/group/QueryProposalsByGroupPolicy'
import QueryTallyResult from '@components/group/QueryTallyResult'
import QueryVoteByProposalVoter from '@components/group/QueryVoteByProposalVoter'
import QueryVotesByProposal from '@components/group/QueryVotesByProposal'
import QueryVotesByVoter from '@components/group/QueryVotesByVoter'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'mods | group',
}

const GroupPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group module'}</h1>
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
  </div>
)

export default GroupPage
