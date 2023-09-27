'use client'

// import { Metadata } from 'next'
import { useState } from 'react'

import { voucherModule } from 'chora/modules'

import MoreInfo from '@components/MoreInfo'
import MsgCreate from '@components/voucher/MsgCreate'
import MsgIssue from '@components/voucher/MsgIssue'
import MsgUpdateIssuer from '@components/voucher/MsgUpdateIssuer'
import MsgUpdateMetadata from '@components/voucher/MsgUpdateMetadata'
import QueryBalance from '@components/voucher/QueryBalance'
import QueryBalancesByAddress from '@components/voucher/QueryBalancesByAddress'
import QueryBalancesByVoucher from '@components/voucher/QueryBalancesByVoucher'
import QueryVoucher from '@components/voucher/QueryVoucher'
import QueryVouchers from '@components/voucher/QueryVouchers'
import QueryVouchersByIssuer from '@components/voucher/QueryVouchersByIssuer'

import styles from './page.module.css'

// export const metadata: Metadata = {
//   title: 'voucher',
// }

const VoucherPage = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false)

  const handleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <div className={styles.page}>
      <div>
        <h1>{'voucher module'}</h1>
        <button className={styles.infoButton} onClick={handleShowInfo}>
          {showInfo ? 'less info' : 'more info'}
        </button>
        <div className={styles.box}>
          {showInfo && <MoreInfo module={voucherModule} />}
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
              <a href="#query-balances-by-address">
                {'QueryBalancesByAddress'}
              </a>
            </li>
            <li>
              <a href="#query-balances-by-voucher">
                {'QueryBalancesByVoucher'}
              </a>
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
        <MsgCreate />
        <MsgIssue />
        <MsgUpdateIssuer />
        <MsgUpdateMetadata />
        <QueryBalance />
        <QueryBalancesByAddress />
        <QueryBalancesByVoucher />
        <QueryVoucher />
        <QueryVouchers />
        <QueryVouchersByIssuer />
      </div>
    </div>
  )
}

export default VoucherPage
