import { Metadata } from 'next'

import Vouchers from '@components/vouchers/Vouchers'
import VouchersNav from '@components/vouchers/VouchersNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const VouchersPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'explore vouchers'}</h1>
      <VouchersNav />
      <Vouchers />
    </div>
  </div>
)

export default VouchersPage
