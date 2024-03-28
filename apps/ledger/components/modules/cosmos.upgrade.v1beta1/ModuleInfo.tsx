'use client'

import { cosmosSlashingV1beta1 } from 'cosmos/modules'
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
        {showInfo && <MoreInfo module={cosmosSlashingV1beta1} />}
        <ul>
          <li className={styles.inactive}>
            <a href="#msg-software-upgrade">{'MsgSoftwareUpgrade'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-cancel-upgrade">{'MsgCancelUpgrade'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-applied-plan">{'QueryAppliedPlan'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-authority">{'QueryAuthority'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-current-plan">{'QueryCurrentPlan'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-module-versions">{'QueryModuleVersions'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-upgraded-consensus-state">
              {'QueryUpgradedConsensusState'}
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
