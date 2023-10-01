import { Metadata } from 'next'

import ModuleInfo from '@components/voucher/ModuleInfo'
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

export const metadata: Metadata = {
  title: 'mods | voucher',
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
