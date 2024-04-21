import { Metadata } from 'next'

import AddVoucher from '@components/vouchers/AddVoucher'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const AddPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'add voucher'}</h1>
      <AddVoucher />
    </div>
  </div>
)

export default AddPage
