import { Metadata } from 'next'

import Baskets from '@components/baskets/Baskets'
import BasketsNav from '@components/baskets/BasketsNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const BasketsPage = () => (
  <div className={styles.page}>
    <h1>{'explore credit baskets'}</h1>
    <BasketsNav />
    <Baskets />
  </div>
)

export default BasketsPage
