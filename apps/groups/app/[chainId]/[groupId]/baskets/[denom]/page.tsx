import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import Basket from '@components/groups/baskets/Basket'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const BasketPage = () => (
  <div className={styles.page}>
    <Breadcrumb text="baskets" />
    <h1>{'group credit basket'}</h1>
    <Basket />
  </div>
)

export default BasketPage
