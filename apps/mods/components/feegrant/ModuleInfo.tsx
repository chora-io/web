'use client'

import { feegrantModule } from 'cosmos/modules'
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
        {showInfo && <MoreInfo module={feegrantModule} />}
        <ul>
          <li>
            <a href="#msg-grant-allowance">{'MsgGrantAllowance'}</a>
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
