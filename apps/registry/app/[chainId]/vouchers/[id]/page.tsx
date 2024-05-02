import { Metadata } from 'next'

import Balances from '@components/vouchers/Balances'
import Voucher from '@components/vouchers/Voucher'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const VoucherPage = () => (
  <div className={styles.page}>
    <h1>{'voucher'}</h1>
    <Voucher />
    <h1>{'balances'}</h1>
    <Balances />
  </div>
)

export default VoucherPage
