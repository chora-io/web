'use client'

import { cosmosCircuitV1 } from 'cosmos/modules'
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
        {showInfo && <MoreInfo module={cosmosCircuitV1} />}
        <ul>
          <li className={styles.inactive}>
            <a href="#msg-authorize-circuit-breaker">
              {'MsgAuthorizeCircuitBreaker'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-reset-circuit-breaker">{'MsgResetCircuitBreaker'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-trip-circuit-breaker">{'MsgTripCircuitBreaker'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-account">{'QueryAccount'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-accounts">{'QueryAccounts'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-disabled-list">{'QueryDisabledList'}</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
