'use client'

import { cosmosParamsV1beta1 } from 'cosmos/modules'
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
        {showInfo && <MoreInfo module={cosmosParamsV1beta1} />}
        <ul>
          <li className={styles.inactive}>
            <a href="#query-params">{'QueryParams'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-subspaces">{'QuerySubspaces'}</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
