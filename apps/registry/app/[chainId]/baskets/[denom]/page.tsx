import { Metadata } from 'next'

import Basket from '@components/baskets/Basket'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const BasketPage = () => (
  <div className={styles.page}>
    <h1>{'credit basket'}</h1>
    <Basket />
  </div>
)

export default BasketPage
