import { Metadata } from 'next'

import Basket from '@components/baskets/Basket'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const CreditPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'credit basket'}</h1>
      <Basket />
    </div>
  </div>
)

export default CreditPage
