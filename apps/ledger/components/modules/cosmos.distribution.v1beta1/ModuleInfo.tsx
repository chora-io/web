'use client'

import { cosmosDistributionV1beta1 } from 'cosmos/modules'
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
        {showInfo && <MoreInfo module={cosmosDistributionV1beta1} />}
        <ul>
          <li className={styles.inactive}>
            <a href="#msg-community-pool-spend">{'MsgCommunityPoolSpend'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-deposit-validator-rewards-pool">
              {'MsgDepositValidatorRewardsPool'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-fund-community-pool">{'MsgFundCommunityPool'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-set-withdraw-address">{'MsgSetWithdrawAddress'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-update-params">{'MsgUpdateParams'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-withdraw-delegator-reward">
              {'MsgWithdrawDelegatorReward'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-withdraw-validator-comission">
              {'MsgWithdrawValidatorCommission'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-community-pool">{'QueryCommunityPool'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-params">{'QueryParams'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-validator-distribution-info">
              {'QueryValidatorDistributionInfo'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-validator-outstanding-rewards">
              {'QueryValidatorOutstandingRewards'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-validator-commission">
              {'QueryValidatorCommission'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-validator-slashes">{'QueryValidatorSlashes'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-delegation-rewards">{'QueryDelegationRewards'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-delegation-total-rewards">
              {'QueryDelegationTotalRewards'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-delegator-validators">
              {'QueryDelegatorValidators'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-delegator-withdraw-address">
              {'QueryDelegatorWithdrawAddress'}
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
