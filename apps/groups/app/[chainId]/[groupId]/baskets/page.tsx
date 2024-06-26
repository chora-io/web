import { Metadata } from 'next'

import Baskets from '@components/groups/baskets/Baskets'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const BasketsPage = () => (
  <div className={styles.page}>
    <h1>{'group credit baskets'}</h1>
    <Baskets />
  </div>
)

export default BasketsPage
