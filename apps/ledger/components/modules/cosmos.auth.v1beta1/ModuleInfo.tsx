'use client'

import { cosmosAuthV1beta1 } from 'cosmos/modules'
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
        {showInfo && <MoreInfo module={cosmosAuthV1beta1} />}
        <ul>
          <li className={styles.inactive}>
            <a href="#address-bytes-to-string">{'AddressBytesToString'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#address-string-to-bytes">{'AddressStringToBytes'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#bech32-prefix">{'Bech32Prefix'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-update-params">{'MsgUpdateParams'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-account">{'QueryAccount'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-account-address-by-id">
              {'QueryAccountAddressByID'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-account-info">{'QueryAccountInfo'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-accounts">{'QueryAccounts'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-module-account-by-name">
              {'QueryModuleAccountByName'}
            </a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-module-accounts">{'QueryModuleAccounts'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-params">{'QueryParams'}</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
