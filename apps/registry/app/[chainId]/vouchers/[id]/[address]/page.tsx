import { Metadata } from 'next'

import Balance from '@components/vouchers/Balance'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const BalancePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'balance'}</h1>
      <Balance />
    </div>
  </div>
)

export default BalancePage
