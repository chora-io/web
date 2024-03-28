'use client'

import { choraContentV1 } from 'cosmos/modules'
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
        {showInfo && <MoreInfo module={choraContentV1} />}
        <ul>
          <li>
            <a href="#msg-create">{'MsgCreate'}</a>
          </li>
          <li>
            <a href="#msg-delete">{'MsgDelete'}</a>
          </li>
          <li>
            <a href="#msg-update-curator">{'MsgUpdateCurator'}</a>
          </li>
          <li>
            <a href="#msg-update-metadata">{'MsgUpdateMetadata'}</a>
          </li>
          <li>
            <a href="#query-content">{'QueryContent'}</a>
          </li>
          <li>
            <a href="#query-contents">{'QueryContents'}</a>
          </li>
          <li>
            <a href="#query-contents-by-curator">{'QueryContentsByCurator'}</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
