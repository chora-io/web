'use client'

import { choraVoucherV1 } from 'cosmos/modules'
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
        {showInfo && <MoreInfo module={choraVoucherV1} />}
        <ul>
          <li>
            <a href="#msg-create">{'MsgCreate'}</a>
          </li>
          <li>
            <a href="#msg-issue">{'MsgIssue'}</a>
          </li>
          <li>
            <a href="#msg-update-issuer">{'MsgUpdateIssuer'}</a>
          </li>
          <li>
            <a href="#msg-update-metadata">{'MsgUpdateMetadata'}</a>
          </li>
          <li>
            <a href="#query-balance">{'QueryBalance'}</a>
          </li>
          <li>
            <a href="#query-balances-by-address">{'QueryBalancesByAddress'}</a>
          </li>
          <li>
            <a href="#query-balances-by-voucher">{'QueryBalancesByVoucher'}</a>
          </li>
          <li>
            <a href="#query-voucher">{'QueryVoucher'}</a>
          </li>
          <li>
            <a href="#query-vouchers">{'QueryVouchers'}</a>
          </li>
          <li>
            <a href="#query-vouchers-by-issuer">{'QueryVouchersByIssuer'}</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
