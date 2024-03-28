'use client'

import { cosmosBankV1beta1 } from 'cosmos/modules'
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
        {showInfo && <MoreInfo module={cosmosBankV1beta1} />}
        <ul>
          <li className={styles.inactive}>
            <a href="#msg-burn">{'MsgBurn'}</a>
          </li>
          <li>
            <a href="#msg-multi-send">{'MsgMultiSend'}</a>
          </li>
          <li>
            <a href="#msg-send">{'MsgSend'}</a>
          </li>
          <li>
            <a href="#msg-set-send-enabled">{'MsgSetSendEnabled'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-update-params">{'MsgUpdateParams'}</a>
          </li>
          <li>
            <a href="#query-all-balances">{'QueryAllBalances'}</a>
          </li>
          <li>
            <a href="#query-balance">{'QueryBalance'}</a>
          </li>
          <li>
            <a href="#query-denom-metadata">{'QueryDenomMetadata'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-denom-metadata-by-query-string">
              {'QueryDenomMetadataByQueryString'}
            </a>
          </li>
          <li>
            <a href="#query-denom-owners">{'QueryDenomOwners'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-denom-owners-by-query">
              {'QueryDenomOwnersByQuery'}
            </a>
          </li>
          <li>
            <a href="#query-denoms-metadata">{'QueryDenomsMetadata'}</a>
          </li>
          <li>
            <a href="#query-denoms-metadata">{'QueryDenomsMetadata'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-params">{'QueryParams'}</a>
          </li>
          <li>
            <a href="#query-send-enabled">{'QuerySendEnabled'}</a>
          </li>
          <li>
            <a href="#query-spendable-balance-by-denom">
              {'QuerySpendableBalanceByDenom'}
            </a>
          </li>
          <li>
            <a href="#query-spendable-balances">{'QuerySpendableBalances'}</a>
          </li>
          <li>
            <a href="#query-supply-of">{'QuerySupplyOf'}</a>
          </li>
          <li>
            <a href="#query-total-supply">{'QueryTotalSupply'}</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
