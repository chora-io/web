import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import CreateBasket from '@components/baskets/CreateBasket'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const CreatePage = () => (
  <div className={styles.page}>
    <div>
      <Breadcrumb text="← baskets" />
      <h1>{'create credit basket'}</h1>
      <CreateBasket />
    </div>
  </div>
)

export default CreatePage
