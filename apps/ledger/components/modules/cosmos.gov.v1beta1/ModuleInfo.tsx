'use client'

import { cosmosGovV1beta1 } from 'cosmos/modules'
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
        {showInfo && <MoreInfo module={cosmosGovV1beta1} />}
        <ul>
          <li className={styles.inactive}>
            <a href="#msg-deposit">{'MsgDeposit'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-submit-proposal">{'MsgSubmitProposal'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-vote">{'MsgVote'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-vote-weighted">{'MsgVoteWeighted'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-deposit">{'QueryDeposit'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-deposits">{'QueryDeposits'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-proposal">{'QueryProposal'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-proposals">{'QueryProposals'}</a>
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
