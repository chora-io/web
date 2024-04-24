import { Metadata } from 'next'

import Basket from '@components/groups/baskets/Basket'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const BasketPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group credit basket'}</h1>
      <Basket />
    </div>
  </div>
)

export default BasketPage
