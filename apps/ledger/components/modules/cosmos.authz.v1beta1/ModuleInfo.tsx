'use client'

import { cosmosAuthzV1beta1 } from 'cosmos/modules'
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
        {showInfo && <MoreInfo module={cosmosAuthzV1beta1} />}
        <ul>
          <li>
            <a href="#msg-exec">{'MsgExec'}</a>
          </li>
          <li>
            <a href="#msg-grant">{'MsgGrant'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-prune-expired-grants">{'MsgPruneExpiredGrants'}</a>
          </li>
          <li>
            <a href="#msg-revoke">{'MsgRevoke'}</a>
          </li>
          <li>
            <a href="#query-grantee-grants">{'QueryGranteeGrants'}</a>
          </li>
          <li>
            <a href="#query-granter-grants">{'QueryGranterGrants'}</a>
          </li>
          <li>
            <a href="#query-grants">{'QueryGrants'}</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
