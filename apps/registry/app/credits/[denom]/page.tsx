import { Metadata } from 'next'

import Credit from '@components/credits/Credit'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const CreditPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'credit batch'}</h1>
      <Credit />
    </div>
  </div>
)

export default CreditPage
