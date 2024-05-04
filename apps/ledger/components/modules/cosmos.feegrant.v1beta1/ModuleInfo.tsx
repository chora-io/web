'use client'

import { cosmosFeegrantV1beta1 } from 'cosmos/modules'
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
        {showInfo && <MoreInfo module={cosmosFeegrantV1beta1} />}
        <ul>
          <li>
            <a href="#msg-grant-allowance">{'MsgGrantAllowance'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-prune-allowances">{'MsgPruneAllowances'}</a>
          </li>
          <li>
            <a href="#msg-revoke-allowance">{'MsgRevokeAllowance'}</a>
          </li>
          <li>
            <a href="#query-allowance">{'QueryAllowance'}</a>
          </li>
          <li>
            <a href="#query-allowances">{'QueryAllowances'}</a>
          </li>
          <li>
            <a href="#query-allowances-by-granter">
              {'QueryAllowancesByGranter'}
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
