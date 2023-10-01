'use client'

import { geonodeModule } from 'cosmos/modules'
import { useState } from 'react'

import MoreInfo from '@components/MoreInfo'

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
        {showInfo && <MoreInfo module={geonodeModule} />}
        <ul>
          <li>
            <a href="#msg-create">{'MsgCreate'}</a>
          </li>
          <li>
            <a href="#msg-update-curator">{'MsgUpdateCurator'}</a>
          </li>
          <li>
            <a href="#msg-update-metadata">{'MsgUpdateMetadata'}</a>
          </li>
          <li>
            <a href="#query-node">{'QueryNode'}</a>
          </li>
          <li>
            <a href="#query-nodes">{'QueryNodes'}</a>
          </li>
          <li>
            <a href="#query-nodes-by-curator">{'QueryNodesByCurator'}</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo