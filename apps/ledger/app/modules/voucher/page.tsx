import { Metadata } from 'next'

import ModuleInfo from '@components/modules/chora.voucher.v1/ModuleInfo'
import MsgCreate from '@components/modules/chora.voucher.v1/MsgCreate'
import MsgIssue from '@components/modules/chora.voucher.v1/MsgIssue'
import MsgUpdateIssuer from '@components/modules/chora.voucher.v1/MsgUpdateIssuer'
import MsgUpdateMetadata from '@components/modules/chora.voucher.v1/MsgUpdateMetadata'
import QueryBalance from '@components/modules/chora.voucher.v1/QueryBalance'
import QueryBalancesByAddress from '@components/modules/chora.voucher.v1/QueryBalancesByAddress'
import QueryBalancesByVoucher from '@components/modules/chora.voucher.v1/QueryBalancesByVoucher'
import QueryVoucher from '@components/modules/chora.voucher.v1/QueryVoucher'
import QueryVouchers from '@components/modules/chora.voucher.v1/QueryVouchers'
import QueryVouchersByIssuer from '@components/modules/chora.voucher.v1/QueryVouchersByIssuer'

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
