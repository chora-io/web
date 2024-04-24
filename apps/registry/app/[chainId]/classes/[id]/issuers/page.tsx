import { Metadata } from 'next'

import ClassIssuers from '@components/classes/ClassIssuers'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const IssuersPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'class issuers'}</h1>
      <ClassIssuers />
    </div>
  </div>
)

export default IssuersPage
