import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import Balance from '@components/groups/vouchers/Balance'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const BalancePage = () => (
  <div className={styles.page}>
    <Breadcrumb text="vouchers" />
    <h1>{'balance'}</h1>
    <Balance />
  </div>
)

export default BalancePage
