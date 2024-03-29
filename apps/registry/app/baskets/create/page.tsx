import { Metadata } from 'next'

import CreateBasket from '@components/baskets/CreateBasket'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const CreatePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'create basket'}</h1>
      <CreateBasket />
    </div>
  </div>
)

export default CreatePage
