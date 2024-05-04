'use client'

import { cosmosGroupV1 } from 'cosmos/modules'
import { useState } from 'react'

import MoreInfo from '@components/modules/MoreInfo'

import styles from './ModuleInfo.module.css'

const ModuleInfo = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false)

  const handleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <>
      <button className={styles.infoButton} onClick={handleShowInfo}>
        {showInfo ? 'less info' : 'more info'}
      </button>
      <div className={styles.infoBox}>
        {showInfo && <MoreInfo module={cosmosGroupV1} />}
        <ul>
          <li>
            <a href="#msg-create-group">{'MsgCreateGroup'}</a>
          </li>
          <li>
            <a href="#msg-create-group-with-policy">
              {'MsgCreateGroupWithPolicy'}
            </a>
          </li>
          <li>
            <a href="#msg-create-group-policy">{'MsgCreateGroupPolicy'}</a>
          </li>
          <li>
            <a href="#msg-exec">{'MsgExec'}</a>
          </li>
          <li>
            <a href="#msg-leave-group">{'MsgLeaveGroup'}</a>
          </li>
          <li>
            <a href="#msg-submit-proposal">{'MsgSubmitProposal'}</a>
          </li>
          <li>
            <a href="#msg-update-group-admin">{'MsgUpdateGroupAdmin'}</a>
          </li>
          <li>
            <a href="#msg-update-group-members">{'MsgUpdateGroupMembers'}</a>
          </li>
          <li>
            <a href="#msg-update-group-metadata">{'MsgUpdateGroupMetadata'}</a>
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
            <a href="#msg-vote">{'MsgVote'}</a>
          </li>
          <li>
            <a href="#msg-withdraw-proposal">{'MsgWithdrawProposal'}</a>
          </li>
          <li>
            <a href="#query-group-info">{'QueryGroupInfo'}</a>
          </li>
          <li>
            <a href="#query-group-members">{'QueryGroupMembers'}</a>
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
            <a href="#query-group-policy-info">{'QueryGroupPolicyInfo'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-groups">{'QueryGroups'}</a>
          </li>
          <li>
            <a href="#query-groups-by-admin">{'QueryGroupsByAdmin'}</a>
          </li>
          <li>
            <a href="#query-groups-by-member">{'QueryGroupsByMember'}</a>
          </li>
          <li>
            <a href="#query-proposal">{'QueryProposal'}</a>
          </li>
          <li>
            <a href="#query-proposals-by-group-policy">
              {'QueryProposalsByGroupPolicy'}
            </a>
          </li>
          <li>
            <a href="#query-tally-result">{'QueryTallyResult'}</a>
          </li>
          <li>
            <a href="#query-vote-by-proposal-voter">
              {'QueryVoteByProposalVoter'}
            </a>
          </li>
          <li>
            <a href="#query-votes-by-proposal">{'QueryVotesByProposal'}</a>
          </li>
          <li>
            <a href="#query-votes-by-voter">{'QueryVotesByVoter'}</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
