import { Metadata } from 'next'

import Vouchers from '@components/groups/vouchers/Vouchers'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const VouchersPage = () => (
  <div className={styles.page}>
    <h1>{'group vouchers'}</h1>
    <Vouchers />
  </div>
)

export default VouchersPage
