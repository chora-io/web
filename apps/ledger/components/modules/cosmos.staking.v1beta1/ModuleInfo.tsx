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
      <div className={styles.box}>
        {showInfo && <MoreInfo module={cosmosGovV1} />}
        <ul>
          <li className={styles.inactive}>
            <a href="#msg-begin-redelegate">{'MsgBeginRedelegate'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-cancel-unbonding-delegation">
              {'MsgCancelUnbondingDelegation'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-create-validator">{'MsgCreateValidator'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-delegate">{'MsgDelegate'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-edit-validator">{'MsgEditValidator'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-rotate-cons-pub-key">{'MsgRotateConsPubKey'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-undelegate">{'MsgUndelegate'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-update-params">{'MsgUpdateParams'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-delegation">{'QueryDelegation'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-delegator-delegations">
              {'QueryDelegatorDelegations'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-delegator-unbonding-delegations">
              {'QueryDelegatorUnbondingDelegations'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-delegator-validator">{'QueryDelegatorValidator'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-delegator-validators">
              {'QueryDelegatorValidators'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-historical-info">{'QueryHistoricalInfo'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-paramaters">{'QueryParameters'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-pool">{'QueryPool'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-redelegations">{'QueryRedelegations'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-unbonding-delegation">
              {'QueryUnbondingDelegation'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-validator">{'QueryValidator'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-validator-delegations">
              {'QueryValidatorDelegations'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-validator-unbonding-delegations">
              {'QueryValidatorUnbondingDelegations'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-validators">{'QueryValidators'}</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
