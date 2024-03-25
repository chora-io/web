import { Metadata } from 'next'

import Claims from '@components/claims/Claims'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const ClaimsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'explore data claims'}</h1>
      <Claims />
    </div>
  </div>
)

export default ClaimsPage
