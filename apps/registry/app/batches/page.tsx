import { Metadata } from 'next'

import Batches from '@components/batches/Batches'
import BatchesNav from '@components/batches/BatchesNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const CreditsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'explore credit batches'}</h1>
      <BatchesNav />
      <Batches />
    </div>
  </div>
)

export default CreditsPage
