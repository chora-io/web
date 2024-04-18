import { Metadata } from 'next'

import Issuers from '@components/classes/Issuers'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const IssuersPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'class issuers'}</h1>
      <Issuers />
    </div>
  </div>
)

export default IssuersPage
