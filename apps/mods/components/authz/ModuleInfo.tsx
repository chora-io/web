'use client'

import { authzModule } from 'cosmos/modules'
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
        {showInfo && <MoreInfo module={authzModule} />}
        <ul>
          <li>
            <a href="#msg-exec">{'MsgExec'}</a>
          </li>
          <li>
            <a href="#msg-grant">{'MsgGrant'}</a>
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
