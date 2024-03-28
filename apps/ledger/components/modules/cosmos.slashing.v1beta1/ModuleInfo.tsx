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
            <a href="#msg-unjail">{'MsgUnjail'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-update-params">{'MsgUpdateParams'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-params">{'QueryParams'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-signing-info">{'QuerySigningInfo'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-signing-infos">{'QuerySigningInfos'}</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
