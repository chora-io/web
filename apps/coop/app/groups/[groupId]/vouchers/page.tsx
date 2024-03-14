import { Metadata } from 'next'

import Vouchers from '@components/groups/vouchers/Vouchers'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const VouchersPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'vouchers'}</h1>
      <Vouchers />
    </div>
  </div>
)

export default VouchersPage
