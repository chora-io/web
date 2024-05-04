'use client'

import { cosmosEvidenceV1beta1 } from 'cosmos/modules'
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
        {showInfo && <MoreInfo module={cosmosEvidenceV1beta1} />}
        <ul>
          <li className={styles.inactive}>
            <a href="#msg-submit-evidence">{'MsgSubmitEvidence'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-evidence">{'QueryEvidence'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-all-evidence">{'QueryAllEvidence'}</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
