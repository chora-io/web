import { Metadata } from 'next'

import ModuleInfo from '@components/modules/voucher/ModuleInfo'
import MsgCreate from '@components/modules/voucher/MsgCreate'
import MsgIssue from '@components/modules/voucher/MsgIssue'
import MsgUpdateIssuer from '@components/modules/voucher/MsgUpdateIssuer'
import MsgUpdateMetadata from '@components/modules/voucher/MsgUpdateMetadata'
import QueryBalance from '@components/modules/voucher/QueryBalance'
import QueryBalancesByAddress from '@components/modules/voucher/QueryBalancesByAddress'
import QueryBalancesByVoucher from '@components/modules/voucher/QueryBalancesByVoucher'
import QueryVoucher from '@components/modules/voucher/QueryVoucher'
import QueryVouchers from '@components/modules/voucher/QueryVouchers'
import QueryVouchersByIssuer from '@components/modules/voucher/QueryVouchersByIssuer'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const VoucherPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'voucher module'}</h1>
      <ModuleInfo />
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

export default VoucherPage
