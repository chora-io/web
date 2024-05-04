'use client'

import { choraValidatorV1 } from 'cosmos/modules'
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
        {showInfo && <MoreInfo module={choraValidatorV1} />}
        <ul>
          <li className={styles.inactive}>
            <a href="#msg-add-validator">{'MsgAddValidator'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-remove-validator">{'MsgRemoveValidator'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-update-policy">{'MsgUpdatePolicy'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-update-validator">{'MsgUpdateValidator'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-policy">{'QueryPolicy'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-validator">{'QueryValidator'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-validators">{'QueryValidators'}</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
