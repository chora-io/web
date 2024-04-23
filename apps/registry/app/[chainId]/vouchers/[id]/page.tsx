import { Metadata } from 'next'

import Voucher from '@components/vouchers/Voucher'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const VoucherPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'voucher'}</h1>
      <Voucher />
    </div>
  </div>
)

export default VoucherPage
