import { Metadata } from 'next'

import ModuleInfo from '@components/modules/group/ModuleInfo'
import MsgCreateGroup from '@components/modules/group/MsgCreateGroup'
import MsgCreateGroupWithPolicy from '@components/modules/group/MsgCreateGroupWithPolicy'
import MsgCreateGroupPolicy from '@components/modules/group/MsgCreateGroupPolicy'
import MsgExec from '@components/modules/group/MsgExec'
import MsgLeaveGroup from '@components/modules/group/MsgLeaveGroup'
import MsgSubmitProposal from '@components/modules/group/MsgSubmitProposal'
import MsgUpdateGroupAdmin from '@components/modules/group/MsgUpdateGroupAdmin'
import MsgUpdateGroupMembers from '@components/modules/group/MsgUpdateGroupMembers'
import MsgUpdateGroupMetadata from '@components/modules/group/MsgUpdateGroupMetadata'
import MsgUpdateGroupPolicyAdmin from '@components/modules/group/MsgUpdateGroupPolicyAdmin'
import MsgUpdateGroupPolicyDecisionPolicy from '@components/modules/group/MsgUpdateGroupPolicyDecisionPolicy'
import MsgUpdateGroupPolicyMetadata from '@components/modules/group/MsgUpdateGroupPolicyMetadata'
import MsgVote from '@components/modules/group/MsgVote'
import MsgWithdrawProposal from '@components/modules/group/MsgWithdrawProposal'
import QueryGroupInfo from '@components/modules/group/QueryGroupInfo'
import QueryGroupMembers from '@components/modules/group/QueryGroupMembers'
import QueryGroupPoliciesByAdmin from '@components/modules/group/QueryGroupPoliciesByAdmin'
import QueryGroupPoliciesByGroup from '@components/modules/group/QueryGroupPoliciesByGroup'
import QueryGroupPolicyInfo from '@components/modules/group/QueryGroupPolicyInfo'
import QueryGroupsByAdmin from '@components/modules/group/QueryGroupsByAdmin'
import QueryGroupsByMember from '@components/modules/group/QueryGroupsByMember'
import QueryProposal from '@components/modules/group/QueryProposal'
import QueryProposalsByGroupPolicy from '@components/modules/group/QueryProposalsByGroupPolicy'
import QueryTallyResult from '@components/modules/group/QueryTallyResult'
import QueryVoteByProposalVoter from '@components/modules/group/QueryVoteByProposalVoter'
import QueryVotesByProposal from '@components/modules/group/QueryVotesByProposal'
import QueryVotesByVoter from '@components/modules/group/QueryVotesByVoter'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
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
