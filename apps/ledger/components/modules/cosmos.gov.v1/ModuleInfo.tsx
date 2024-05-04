'use client'

import { cosmosGovV1 } from 'cosmos/modules'
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
        {showInfo && <MoreInfo module={cosmosGovV1} />}
        <ul>
          <li className={styles.inactive}>
            <a href="#msg-cancel-proposal">{'MsgCancelProposal'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-deposit">{'MsgDeposit'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-exec-legacy-content">{'MsgExecLegacyContent'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-update-message-params">{'MsgUpdateMessageParams'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-submit-multiple-choice-proposal">
              {'MsgSubmitMultipleChoiceProposal'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-submit-proposal">{'MsgSubmitProposal'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-sudo-exec">{'MsgSudoExec'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-update-params">{'MsgUpdateParams'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-vote">{'MsgVote'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-vote-weighted">{'MsgVoteWeighted'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-constitution">{'QueryConstitution'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-deposit">{'QueryDeposit'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-deposits">{'QueryDeposits'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-message-based-params">
              {'QueryMessageBasedParams'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-params">{'QueryParams'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-proposal">{'QueryProposal'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-proposals">{'QueryProposals'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-proposal-vote-options">
              {'QueryProposalVoteOptions'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-tally-result">{'QueryTallyResult'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-vote">{'QueryVote'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-votes">{'QueryVotes'}</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
